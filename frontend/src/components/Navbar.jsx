import { Link, useLocation } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Image as ImageIcon, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Brand Generator', path: '/generator', icon: <Sparkles size={18} /> },
    { name: 'Logo Creator', path: '/logo', icon: <ImageIcon size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={18} /> },
  ];

  return (
    <nav className="glass-panel" style={{ 
      margin: '1rem', 
      padding: '1rem 2rem',
      position: 'sticky',
      top: '1rem',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={24} color="var(--accent-primary)" />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit' }} className="gradient-text">BrandCraft AI</span>
      </Link>

      {/* Desktop Navigation */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: 500
            }}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
