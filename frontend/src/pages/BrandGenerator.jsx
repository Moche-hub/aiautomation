import { useState } from 'react';
import { Wand2, Copy, Check, Loader2, Save } from 'lucide-react';

const BrandGenerator = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    target_audience: '',
    style: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedKeys, setCopiedKeys] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setResult(data);

      // Optionally save to local storage
      const existing = JSON.parse(localStorage.getItem('brandcraft_brands') || '[]');
      localStorage.setItem('brandcraft_brands', JSON.stringify([
        { ...data, metadata: formData, date: new Date().toISOString() }, 
        ...existing
      ]));

    } catch (error) {
      console.error('Failed to generate brand:', error);
      alert('Failed to generate brand assets. Make sure your local backend is running and the API key is set.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKeys(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedKeys(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', alignItems: 'start' }}>
      
      {/* Input Form */}
      <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '7rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Brand Identity Form</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Fill in details to generate AI branding assets.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Business Name / Idea</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. EcoSpark" 
              required
              value={formData.business_name}
              onChange={(e) => setFormData({...formData, business_name: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Industry</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Sustainable Energy" 
              required
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Eco-conscious homeowners" 
              required
              value={formData.target_audience}
              onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brand Style & Tone</label>
            <select 
              className="form-input" 
              required
              value={formData.style}
              onChange={(e) => setFormData({...formData, style: e.target.value})}
            >
              <option value="">Select a style...</option>
              <option value="Modern & Minimalist">Modern & Minimalist</option>
              <option value="Playful & energetic">Playful & Energetic</option>
              <option value="Corporate & Professional">Corporate & Professional</option>
              <option value="Luxurious & Premium">Luxurious & Premium</option>
              <option value="Warm & Approachable">Warm & Approachable</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? <Loader2 size={20} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> : <Wand2 size={20} />}
            {isLoading ? 'Generating Assets...' : 'Generate Brand'}
          </button>
        </form>

        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @media (max-width: 900px) {
            .container { grid-template-columns: 1fr !important; }
            .glass-panel { position: relative !important; top: 0 !important; }
          }
        `}</style>
      </div>

      {/* Output Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {!result && !isLoading && (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)', borderStyle: 'dashed', borderWidth: '2px' }}>
            <Wand2 size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
            <h3>Your generation will appear here</h3>
            <p style={{ marginTop: '0.5rem' }}>Fill in the form and click generate</p>
          </div>
        )}

        {isLoading && (
          <div className="glass-panel" style={{ padding: '6rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
             <Loader2 size={40} className="spin" color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
             <h3 className="gradient-text">Crafting your brand identity...</h3>
             <p style={{ color: 'var(--text-secondary)' }}>Our AI is researching, writing, and formatting assets.</p>
          </div>
        )}

        {result && (
          <>
            {/* Slogan */}
            <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
               <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '1rem' }}>The Slogan</h3>
               <h2 style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 600 }}>"{result.slogan}"</h2>
               <button 
                  onClick={() => copyToClipboard(result.slogan, 'slogan')}
                  className="btn-secondary" 
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem', border: 'none' }}>
                 {copiedKeys['slogan'] ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
               </button>
            </div>

            {/* Brand Names Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {result.brand_names?.map((name, i) => (
                <div key={i} className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => copyToClipboard(name, `name_${i}`)}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{name}</span>
                  {copiedKeys[`name_${i}`] ? <Check size={16} color="#10b981" /> : <Copy size={16} color="var(--text-muted)" />}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
               <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '1rem' }}>Brand Description</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>{result.description}</p>
               <button 
                  onClick={() => copyToClipboard(result.description, 'description')}
                  className="btn-secondary" 
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem', border: 'none' }}>
                 {copiedKeys['description'] ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
               </button>
            </div>

            {/* Social Captions */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
               <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>Social Media Captions</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {result.social_media_captions?.map((caption, i) => (
                   <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-subtle)', position: 'relative' }}>
                     <p style={{ color: 'white', paddingRight: '2rem', lineHeight: 1.6 }}>{caption}</p>
                     <button 
                        onClick={() => copyToClipboard(caption, `caption_${i}`)}
                        className="btn-secondary" 
                        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem', border: 'none', background: 'transparent' }}>
                       {copiedKeys[`caption_${i}`] ? <Check size={16} color="#10b981" /> : <Copy size={16} color="var(--text-muted)" />}
                     </button>
                   </div>
                 ))}
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrandGenerator;
