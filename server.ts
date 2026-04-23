import express from 'express';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './src/db';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // --- API Routes ---

  // Login
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ success: true, user: { username: user.username } });
  });

  // Logout
  app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
  });

  // Middleware to check auth
  const requireAuth = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // Check Auth Status
  app.get('/api/me', requireAuth, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Public: Get Projects
  app.get('/api/projects', (req, res) => {
    const projects = db.prepare('SELECT * FROM projects ORDER BY createdAt DESC').all();
    res.json(projects);
  });

  // Admin: Create Project
  app.post('/api/projects', requireAuth, (req, res) => {
    const { title, description, imageUrl, link } = req.body;
    const result = db.prepare('INSERT INTO projects (title, description, imageUrl, link) VALUES (?, ?, ?, ?)').run(title, description, imageUrl, link);
    res.json({ id: result.lastInsertRowid });
  });

  // Admin: Delete Project
  app.delete('/api/projects/:id', requireAuth, (req, res) => {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Public: Send Message
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)').run(name, email, message);
    res.json({ success: true });
  });

  // Admin: Get Messages
  app.get('/api/messages', requireAuth, (req, res) => {
    const messages = db.prepare('SELECT * FROM messages ORDER BY createdAt DESC').all();
    res.json(messages);
  });


  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving (if needed in future)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
