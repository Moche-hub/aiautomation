import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BrandGenerator from './pages/BrandGenerator';
import LogoGenerator from './pages/LogoGenerator';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<BrandGenerator />} />
            <Route path="/logo" element={<LogoGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
