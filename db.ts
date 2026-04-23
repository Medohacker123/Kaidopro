import Database from 'better-sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const db = new Database('local.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    imageUrl TEXT,
    link TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed admin user if not exists
const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
if (!adminUser) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('Admin user created: admin / admin123');
}

// Seed sample projects if empty
const projectCount = db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
if (projectCount.count === 0) {
  const insertProject = db.prepare('INSERT INTO projects (title, description, imageUrl, link) VALUES (?, ?, ?, ?)');
  insertProject.run(
    'Project Alpha',
    'A revolutionary AI-powered task manager that helps you organize your life.',
    'https://picsum.photos/seed/alpha/800/600',
    '#'
  );
  insertProject.run(
    'Neon Dashboard',
    'A futuristic analytics dashboard built with React and D3.js.',
    'https://picsum.photos/seed/neon/800/600',
    '#'
  );
  insertProject.run(
    'EcoTracker',
    'Mobile application for tracking carbon footprint and sustainable habits.',
    'https://picsum.photos/seed/eco/800/600',
    '#'
  );
}

export default db;
