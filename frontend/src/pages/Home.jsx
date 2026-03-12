import { Link } from 'react-router-dom';
import { Sparkles, Wand2, Zap, Palette } from 'lucide-react';

const Home = () => {
  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '20px', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
          <span className="gradient-text" style={{ marginRight: '0.5rem' }}>✨ New</span> Powered by Gemini AI
        </div>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Build your brand identity in <span className="gradient-text">seconds.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Generate brand names, slogans, bios, and stunning SVG logos instantly. Uncover your business identity with state-of-the-art AI.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/generator" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            <Wand2 size={20} />
            Generate Brand Assets
          </Link>
          <Link to="/logo" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            <Palette size={20} />
            Create AI Logo
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Zap size={24} color="var(--accent-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Instant Naming</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Get catchy, memorable brand names that resonate with your target audience.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Sparkles size={24} color="var(--accent-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Smart Slogans</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Craft compelling taglines and descriptions tailored to your industry style.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Palette size={24} color="var(--accent-primary)" />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Vector Logos</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Generate beautiful, crisp SVG logos directly via AI, ready to scale for any medium.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
