import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Trash2, Plus, LogOut, LayoutDashboard, MessageSquare, Briefcase } from 'lucide-react';
import { Project, Message, User } from './types';

// --- Components ---

const Navbar = ({ user, onLogout }: { user: User | null, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold text-gray-900">Portfolio.</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#projects" className="text-gray-600 hover:text-black transition-colors">Projects</a>
            <a href="/#about" className="text-gray-600 hover:text-black transition-colors">About</a>
            <a href="/#contact" className="text-gray-600 hover:text-black transition-colors">Contact</a>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-indigo-600 font-medium hover:text-indigo-800">Dashboard</Link>
                <button onClick={onLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-gray-900">Admin</Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/#projects" className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Projects</a>
            <a href="/#about" className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">About</a>
            <a href="/#contact" className="block px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md">Contact</a>
            {user && (
              <Link to="/admin" className="block px-3 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-md">Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Building digital <br className="hidden md:block" />
          <span className="text-gray-400 italic font-serif">experiences</span> that matter.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          I'm a full-stack developer and designer passionate about creating intuitive, 
          performant, and beautiful web applications.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#contact" className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg">
            Get in Touch
          </a>
          <a href="#projects" className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:border-gray-400 transition-all">
            View Work
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Selected Work</h2>
            <p className="text-gray-500">A collection of my recent projects.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
              <p className="text-gray-500 line-clamp-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Let's work together</h2>
        <p className="text-gray-600">Have a project in mind? Send me a message.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input required type="text" name="name" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea required name="message" id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white" placeholder="Tell me about your project..."></textarea>
        </div>
        <button 
          type="submit" 
          disabled={status === 'submitting' || status === 'success'}
          className="w-full bg-black text-white font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
        </button>
        {status === 'error' && <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>}
      </form>
    </section>
  );
};

// --- Admin Components ---

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin();
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
          <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Default: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    if (res.ok) setProjects(await res.json());
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    if (res.ok) setMessages(await res.json());
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setIsAddingProject(false);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.username}</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                Projects
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={16} />
                Messages
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isAddingProject ? <X size={18} /> : <Plus size={18} />}
                {isAddingProject ? 'Cancel' : 'Add Project'}
              </button>
            </div>

            {isAddingProject && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-bold mb-4">New Project</h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 gap-4">
                  <input required name="title" placeholder="Project Title" className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                  <textarea required name="description" placeholder="Description" rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                  <input required name="imageUrl" placeholder="Image URL (e.g., https://picsum.photos/...)" className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                  <input required name="link" placeholder="Project Link" className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                  <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full sm:w-auto">Save Project</button>
                </form>
              </motion.div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={project.imageUrl} alt="" referrerPolicy="no-referrer" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={project.link} target="_blank" className="text-indigo-600 hover:text-indigo-900 truncate block max-w-[150px]">{project.link}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 gap-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No messages yet.</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{msg.name}</h3>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-2">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
    <h1 className="text-6xl font-serif font-bold text-gray-900 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Page not found.</p>
    <Link to="/" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
      Go Home
    </Link>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (e) {
      // Not logged in
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        setProjects(await res.json());
      }
    } catch (e) {
      console.error('Failed to fetch projects');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navbar user={user} onLogout={handleLogout} />
            <main>
              <Hero />
              <ProjectsGrid projects={projects} />
              <Contact />
            </main>
            <footer className="bg-gray-50 py-12 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
              </div>
            </footer>
          </div>
        } />
        <Route path="/login" element={
          user ? <AdminDashboard user={user} /> : <AdminLogin onLogin={checkAuth} />
        } />
        <Route path="/admin" element={
          user ? (
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <AdminDashboard user={user} />
            </>
          ) : (
            <AdminLogin onLogin={checkAuth} />
          )
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
