import { ShieldAlert } from 'lucide-react';
import { riskColor } from '../utils/format';

export default function RiskMatrix({ data }) {
  const { risks } = data;

  return (
    <div className="section">
      <div className="section-title">
        <ShieldAlert size={22} /> Risk Matrix
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {risks.map((risk, i) => (
          <div key={i} className="card" style={{ borderLeft: `3px solid ${riskColor(risk.severity)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{risk.category}</div>
              <span className={`badge risk--${risk.severity}`}>{risk.severity}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{risk.description}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--status-operational)', background: 'rgba(34,197,94,0.06)', padding: '0.5rem', borderRadius: 6 }}>
              <strong>Mitigation:</strong> {risk.mitigation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
