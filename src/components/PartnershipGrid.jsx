import { Users, Globe, Star } from 'lucide-react';

const TIER_COLORS = {
  1: 'var(--accent-gold)',
  2: 'var(--accent-primary)',
  3: 'var(--text-muted)',
};

export default function PartnershipGrid({ data }) {
  const { partnerships } = data;
  const tier1 = partnerships.filter(p => p.tier === 1);
  const tier2 = partnerships.filter(p => p.tier === 2);
  const tier3 = partnerships.filter(p => p.tier === 3);

  const renderPartner = (p, i) => (
    <div key={i} className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            {p.tier === 1 && <Star size={14} color="var(--accent-gold)" fill="var(--accent-gold)" />}
            {p.name}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.country}</div>
        </div>
        <span className={`badge badge--${p.status === 'Beta H1 2026' || p.status === 'Launching 2026' ? 'operational' : p.status === 'Integration' ? 'manifested' : 'planned'}`}>
          {p.status}
        </span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{p.notes}</div>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span><Users size={12} style={{ verticalAlign: -2 }} /> {p.subscribers}</span>
        <span>{p.spectrum}</span>
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', marginTop: 4 }}>{p.revenueModel}</div>
    </div>
  );

  return (
    <div className="section">
      <div className="section-title">
        <Globe size={22} /> Carrier Partnerships ({partnerships.length})
      </div>

      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>⭐ Tier 1 — Anchor Partners</div>
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        {tier1.map(renderPartner)}
      </div>

      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Tier 2 — Strategic Partners</div>
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        {tier2.map(renderPartner)}
      </div>

      {tier3.length > 0 && (
        <>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Tier 3 — Pipeline</div>
          <div className="grid-3">
            {tier3.map(renderPartner)}
          </div>
        </>
      )}
    </div>
  );
}
