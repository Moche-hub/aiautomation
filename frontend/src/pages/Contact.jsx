import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('brandcraft_messages') || '[]');
    const newMessage = {
      ...formData,
      date: new Date().toISOString(),
      id: Date.now()
    };
    
    localStorage.setItem('brandcraft_messages', JSON.stringify([newMessage, ...existing]));
    
    setIsSent(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in <span className="gradient-text">Touch</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Have questions about BrandCraft AI or need support? We're here to help.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={24} color="var(--accent-primary)" />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Email Us</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>For general inquiries and support.</p>
              <a href="mailto:supportbrandai@gmail.com" className="gradient-text" style={{ fontWeight: 600 }}>supportbrandai@gmail.com</a>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={24} color="var(--accent-primary)" />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Live Chat</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Available Mon-Fri, 9am - 5pm EST.</p>
              <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Start Chat</button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
          {isSent ? (
            <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--accent-glow)', borderRadius: '12px', border: '1px solid var(--accent-primary)' }}>
              <Send size={40} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
              <h3>Message Sent!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Your name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="you@company.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  className="form-input" 
                  placeholder="How can we help?" 
                  rows={4}
                  required
                  style={{ resize: 'vertical' }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
