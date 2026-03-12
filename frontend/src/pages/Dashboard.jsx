import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [savedBrands, setSavedBrands] = useState([]);
  const [savedLogos, setSavedLogos] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const brands = JSON.parse(localStorage.getItem('brandcraft_brands') || '[]');
    const logos = JSON.parse(localStorage.getItem('brandcraft_logos') || '[]');
    const msgs = JSON.parse(localStorage.getItem('brandcraft_messages') || '[]');
    setSavedBrands(brands);
    setSavedLogos(logos);
    setMessages(msgs);
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your <span className="gradient-text">Brand Portfolio</span></h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Saved Brands */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '24px', background: 'var(--accent-primary)', borderRadius: '4px' }}></span>
            Generated Brand Text
          </h2>
          
          {savedBrands.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No brand details generated yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {savedBrands.map((brand, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>{brand.metadata.business_name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{brand.metadata.industry}</p>
                  
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>"{brand.slogan}"</p>
                  </div>
                  
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(brand.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Logos */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '24px', background: 'var(--accent-secondary)', borderRadius: '4px' }}></span>
            Generated Logos
          </h2>
          
          {savedLogos.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No logos generated yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {savedLogos.map((logo, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    style={{ width: '100%', height: '200px', background: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: logo.svg }}
                  />
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{logo.metadata.business_name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(logo.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Messages */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '24px', background: 'var(--accent-glow)', borderRadius: '4px' }}></span>
            Contact Inquiries
          </h2>
          
          {messages.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{msg.name}</h3>
                      <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{msg.email}</p>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(msg.date).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
