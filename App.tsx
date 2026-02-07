import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, NewProjectPayload, Category } from './types';
import { 
  Code2, 
  Workflow, 
  Users, 
  ShoppingCart, 
  ArrowUpRight, 
  Plus, 
  Lock, 
  X,
  Trash2,
  Terminal,
  Database,
  Cpu,
  Layers
} from 'lucide-react';

// --- Components ---

const BentoTile: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-obsidian border border-subtle p-6 rounded-2xl relative overflow-hidden group hover:border-mist/30 transition-colors duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const getIcon = () => {
    switch (project.category) {
      case 'Developer': return <Code2 size={16} />;
      case 'Automation': return <Workflow size={16} />;
      case 'Mediator': return <Users size={16} />;
      case 'Buyer': return <ShoppingCart size={16} />;
      default: return <Layers size={16} />;
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-between p-6 bg-obsidian/50 border border-subtle rounded-xl hover:bg-subtle/20 transition-all cursor-default"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-mist uppercase tracking-wider border border-subtle px-2 py-1 rounded-full">
            {getIcon()}
            {project.category}
          </div>
          <a href={project.link} target="_blank" className="text-white opacity-40 hover:opacity-100 transition-opacity">
            <ArrowUpRight size={18} />
          </a>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-mist text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // API URL
  const API_URL = 'http://localhost:3000/api/projects';

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      // Fallback for demo if server isn't running
      setProjects([
        { id: 1, title: "Algorithmic Trading Core", description: "Low-latency execution engine written in Rust.", category: "Developer", link: "#" },
        { id: 2, title: "Legacy System Migration", description: "Bridged technical gap between acquired startup and enterprise parent.", category: "Mediator", link: "#" },
        { id: 3, title: "SaaS Tech Due Diligence", description: "Audit of codebase quality and debt for $20M acquisition.", category: "Buyer", link: "#" },
        { id: 4, title: "CI/CD Auto-Scaling", description: "Self-healing infrastructure on AWS.", category: "Automation", link: "#" },
      ]);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authKey === 'secret_key_123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-white selection:text-charcoal pb-20">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-charcoal/80 backdrop-blur-md border-b border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-bold tracking-tight">ARCHITECT<span className="text-mist">.IO</span></div>
          <div className="text-xs text-mist font-medium">AVAILABLE FOR Q4 2024</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32">
        
        {/* Hero Section - Bento Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
            
            {/* 1. Main Profile - Developer */}
            <BentoTile className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-obsidian to-zinc-900">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                  <Terminal size={24} />
                </div>
                <h1 className="text-4xl font-bold leading-tight">
                  Building the future,<br/> one line at a time.
                </h1>
                <p className="text-mist text-lg">
                  Senior Full-Stack Architect specializing in scalable systems and high-performance applications.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex gap-2 mb-2">
                  <span className="px-3 py-1 bg-subtle/50 rounded-full text-xs">Next.js</span>
                  <span className="px-3 py-1 bg-subtle/50 rounded-full text-xs">Rust</span>
                  <span className="px-3 py-1 bg-subtle/50 rounded-full text-xs">Node</span>
                </div>
              </div>
            </BentoTile>

            {/* 2. Automation Expert */}
            <BentoTile className="md:col-span-2 md:row-span-1 bg-zinc-900" delay={0.1}>
              <div className="flex items-start justify-between h-full">
                <div className="flex flex-col justify-between h-full">
                  <div className="p-2 bg-subtle rounded-lg w-fit mb-4">
                    <Workflow size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Automation Expert</h2>
                    <p className="text-mist text-sm">Eliminating redundancy through intelligent scripting and AI integration.</p>
                  </div>
                </div>
                <div className="h-full w-32 bg-gradient-to-l from-subtle/20 to-transparent rounded-lg"></div>
              </div>
            </BentoTile>

            {/* 3. Mediator */}
            <BentoTile className="md:col-span-1 md:row-span-1 bg-obsidian" delay={0.2}>
              <div className="flex flex-col h-full justify-between">
                <Users size={24} className="text-mist" />
                <div>
                  <h3 className="text-lg font-semibold mt-4">Mediator</h3>
                  <p className="text-xs text-mist mt-1">Bridging tech & business teams.</p>
                </div>
              </div>
            </BentoTile>

            {/* 4. Smart Buyer */}
            <BentoTile className="md:col-span-1 md:row-span-1 bg-obsidian" delay={0.3}>
              <div className="flex flex-col h-full justify-between">
                <ShoppingCart size={24} className="text-mist" />
                <div>
                  <h3 className="text-lg font-semibold mt-4">Smart Buyer</h3>
                  <p className="text-xs text-mist mt-1">Tech procurement & due diligence.</p>
                </div>
              </div>
            </BentoTile>

          </div>
        </section>

        {/* Selected Works */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-subtle pb-4">
            <h2 className="text-2xl font-semibold">Selected Works</h2>
            <span className="text-xs text-mist uppercase tracking-widest">Database: SQLite</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-subtle flex justify-between items-center text-mist text-sm">
        <div>&copy; 2024 Architect. All Rights Reserved.</div>
        <button onClick={() => setShowAdmin(true)} className="hover:text-white transition-colors flex items-center gap-2">
          <Lock size={12} /> Access Terminal
        </button>
      </footer>

      {/* Admin Modal */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-obsidian border border-subtle w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-subtle bg-subtle/20">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database size={16} /> Admin Dashboard
                </h3>
                <button onClick={() => setShowAdmin(false)} className="text-mist hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {!isAuthenticated ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <p className="text-sm text-mist">Enter security key to manage project database.</p>
                    <input 
                      type="password" 
                      value={authKey} 
                      onChange={e => setAuthKey(e.target.value)}
                      placeholder="Security Key..." 
                      className="w-full bg-charcoal border border-subtle rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                    />
                    <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200">
                      Authenticate
                    </button>
                    <p className="text-xs text-mist text-center mt-2">Hint: secret_key_123</p>
                  </form>
                ) : (
                  <AdminPanel projects={projects} refresh={fetchProjects} authKey={authKey} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// --- Admin Sub-component ---

const AdminPanel: React.FC<{ projects: Project[], refresh: () => void, authKey: string }> = ({ projects, refresh, authKey }) => {
  const [formData, setFormData] = useState<NewProjectPayload>({
    title: '', description: '', category: 'Developer', link: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': authKey },
      body: JSON.stringify(formData)
    });
    setLoading(false);
    setFormData({ title: '', description: '', category: 'Developer', link: '' });
    refresh();
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Confirm deletion?")) return;
    await fetch(`http://localhost:3000/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': authKey }
    });
    refresh();
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          placeholder="Project Title" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="bg-charcoal border border-subtle rounded p-2 text-sm focus:border-white outline-none" 
          required 
        />
        <select 
          value={formData.category} 
          onChange={e => setFormData({...formData, category: e.target.value as Category})}
          className="bg-charcoal border border-subtle rounded p-2 text-sm focus:border-white outline-none"
        >
          <option value="Developer">Developer</option>
          <option value="Automation">Automation</option>
          <option value="Mediator">Mediator</option>
          <option value="Buyer">Buyer</option>
        </select>
        <textarea 
          placeholder="Description" 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="col-span-1 md:col-span-2 bg-charcoal border border-subtle rounded p-2 text-sm focus:border-white outline-none" 
          required 
        />
        <input 
          placeholder="Link URL" 
          type="url"
          value={formData.link} 
          onChange={e => setFormData({...formData, link: e.target.value})}
          className="col-span-1 md:col-span-2 bg-charcoal border border-subtle rounded p-2 text-sm focus:border-white outline-none" 
          required 
        />
        <button disabled={loading} className="col-span-1 md:col-span-2 bg-white text-black py-2 rounded font-medium hover:bg-gray-200">
          {loading ? 'Processing...' : 'Add Project Node'}
        </button>
      </form>

      {/* List */}
      <div className="max-h-64 overflow-y-auto space-y-2 border-t border-subtle pt-4">
        <h4 className="text-xs text-mist uppercase tracking-widest mb-2">Existing Database Records</h4>
        {projects.map(p => (
          <div key={p.id} className="flex justify-between items-center bg-subtle/10 p-3 rounded">
            <div>
              <div className="font-medium text-sm">{p.title}</div>
              <div className="text-xs text-mist">{p.category}</div>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;