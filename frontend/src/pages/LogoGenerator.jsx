import { useState } from 'react';
import { Palette, Loader2, Download } from 'lucide-react';

const LogoGenerator = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    style: '',
    target_audience: 'General'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [svgResult, setSvgResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSvgResult('');
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setSvgResult(data.logo_svg);

      // Save to local storage history
      const existing = JSON.parse(localStorage.getItem('brandcraft_logos') || '[]');
      localStorage.setItem('brandcraft_logos', JSON.stringify([
        { svg: data.logo_svg, metadata: formData, date: new Date().toISOString() }, 
        ...existing
      ]));

    } catch (error) {
      console.error('Failed to generate logo:', error);
      alert('Failed to generate logo. Make sure your local backend is running and the API key is set.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!svgResult) return;
    const blob = new Blob([svgResult], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.business_name.replace(/\s+/g, '-').toLowerCase()}-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>AI <span className="gradient-text">Logo Creator</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Generate pure standard vector graphics (SVG) logos powered entirely by the Gemini API's text-to-code capabilities.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', width: '100%' }}>
        
        {/* Input Form */}
        <div className="glass-panel" style={{ padding: '2rem', alignSelf: 'start' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. NextGen AI" 
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
                placeholder="e.g. Software, Real Estate, Fashion" 
                required
                value={formData.industry}
                onChange={(e) => setFormData({...formData, industry: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Visual Style</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Minimalist Abstract, Circular, Monogram" 
                required
                value={formData.style}
                onChange={(e) => setFormData({...formData, style: e.target.value})}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
              {isLoading ? <Loader2 size={20} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> : <Palette size={20} />}
              {isLoading ? 'Designing Logo...' : 'Generate Logo SVG'}
            </button>
          </form>
          <style>{`
            @media (max-width: 900px) {
              .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>

        {/* Display Area */}
        <div className="glass-panel" style={{ 
            minHeight: '400px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
            backgroundImage: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)'
          }}>
          
          {!svgResult && !isLoading && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <Palette size={64} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>Your beautiful SVG vector will render here</p>
            </div>
          )}

          {isLoading && (
            <div style={{ textAlign: 'center' }}>
              <Loader2 size={48} className="spin" color="var(--accent-primary)" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 1.5rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Gemini is writing the SVG code...</p>
            </div>
          )}

          {svgResult && (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
              <div 
                style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                dangerouslySetInnerHTML={{ __html: svgResult }}
              />
              
              <button onClick={handleDownload} className="btn-secondary" style={{ marginTop: '2rem', background: 'var(--glass-bg)' }}>
                <Download size={18} /> Download SVG
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LogoGenerator;
