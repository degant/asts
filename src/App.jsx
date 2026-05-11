import { useState, useEffect } from 'react';
import { asts } from './data/asts';
import CompanyHeader from './components/CompanyHeader';
import ConstellationTracker from './components/ConstellationTracker';
import LaunchTimeline from './components/LaunchTimeline';
import PartnershipGrid from './components/PartnershipGrid';
import CompetitorTable from './components/CompetitorTable';
import FinancialSnapshot from './components/FinancialSnapshot';
import CapitalRunway from './components/CapitalRunway';
import CatalystTracker from './components/CatalystTracker';
import TechnologyOverview from './components/TechnologyOverview';
import SatelliteTechDeepDive from './components/SatelliteTechDeepDive';
import RiskMatrix from './components/RiskMatrix';
import RegulatoryTracker from './components/RegulatoryTracker';
import RevenueModel from './components/RevenueModel';
import OwnershipChart from './components/OwnershipChart';
import CommunityLinks from './components/CommunityLinks';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'constellation', label: 'Constellation' },
  { id: 'launches', label: 'Launches' },
  { id: 'catalysts', label: 'Catalysts' },
  { id: 'partners', label: 'Partners' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'technology', label: 'Technology' },
  { id: 'sattech', label: 'Sat Tech' },
  { id: 'financials', label: 'Financials' },
  { id: 'capital', label: 'Capital' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'revenue', label: 'Revenue Model' },
  { id: 'regulatory', label: 'Regulatory' },
  { id: 'risks', label: 'Risks' },
  { id: 'links', label: 'Links & Community' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span style={{ fontSize: '1.2rem' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar nav */}
      <nav className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 200,
        height: '100vh',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-primary)',
        padding: '1rem 0',
        overflowY: 'auto',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '0.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Deep Dive</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>ASTS</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AST SpaceMobile</div>
        </div>
        <div style={{ flex: 1, padding: '0.5rem 0' }}>
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                display: 'block',
                padding: '6px 1rem',
                fontSize: '0.8rem',
                color: activeSection === id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: activeSection === id ? 600 : 400,
                borderLeft: activeSection === id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-primary)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          Data as of {new Date(asts.overview.asOf).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content" style={{ marginLeft: 200, flex: 1, padding: '2rem 3rem', maxWidth: 1200 }}>
        <div id="overview"><CompanyHeader data={asts} /></div>
        <div id="constellation"><ConstellationTracker data={asts} /></div>
        <div id="launches"><LaunchTimeline data={asts} /></div>
        <div id="catalysts"><CatalystTracker data={asts} /></div>
        <div id="partners"><PartnershipGrid data={asts} /></div>
        <div id="competitors"><CompetitorTable data={asts} /></div>
        <div id="technology"><TechnologyOverview data={asts} /></div>
        <div id="sattech"><SatelliteTechDeepDive data={asts} /></div>
        <div id="financials"><FinancialSnapshot data={asts} /></div>
        <div id="capital"><CapitalRunway data={asts} /></div>
        <div id="ownership"><OwnershipChart data={asts} /></div>
        <div id="revenue"><RevenueModel data={asts} /></div>
        <div id="regulatory"><RegulatoryTracker data={asts} /></div>
        <div id="risks"><RiskMatrix data={asts} /></div>
        <div id="links"><CommunityLinks data={asts} /></div>
      </main>
    </div>
  );
}
