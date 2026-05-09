import { Zap, Rocket, DollarSign, Radio, Shield, Calendar, AlertTriangle } from 'lucide-react';
import { formatDate, catalystColor } from '../utils/format';

const TYPE_ICONS = {
  launch: Rocket,
  earnings: DollarSign,
  commercial: Radio,
  regulatory: Shield,
  deployment: Zap,
  financial: DollarSign,
};

export default function CatalystTracker({ data }) {
  const { catalysts } = data;
  const now = new Date();

  const sorted = [...catalysts].sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    if (isNaN(da.getTime()) && isNaN(db.getTime())) return 0;
    if (isNaN(da.getTime())) return 1;
    if (isNaN(db.getTime())) return 1;
    return da - db;
  });

  return (
    <div className="section">
      <div className="section-title">
        <Zap size={22} /> Upcoming Catalysts
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {sorted.map((cat, i) => {
          const Icon = TYPE_ICONS[cat.type] || Calendar;
          const catDate = new Date(cat.date);
          const isPast = !isNaN(catDate.getTime()) && catDate < now;
          const isImminent = !isNaN(catDate.getTime()) && catDate > now && (catDate - now) < 7 * 24 * 3600 * 1000;

          return (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              opacity: isPast ? 0.5 : 1,
              borderLeft: `3px solid ${catalystColor(cat.type)}`,
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 50,
              }}>
                <Icon size={20} color={catalystColor(cat.type)} />
                {isImminent && (
                  <span style={{ fontSize: '0.6rem', color: 'var(--risk-critical)', fontWeight: 700, marginTop: 4 }}>SOON</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{cat.event}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: catalystColor(cat.type) }}>{formatDate(cat.date)}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{cat.description}</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span className={`badge risk--${cat.impact}`}>{cat.impact} impact</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{cat.type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
