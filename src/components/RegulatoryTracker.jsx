import { Shield, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const STATUS_ICONS = {
  complete: CheckCircle2,
  'in-progress': Clock,
  pending: AlertCircle,
  approved: CheckCircle2,
  'early-stage': AlertCircle,
};

const STATUS_COLORS = {
  complete: 'var(--status-operational)',
  'in-progress': 'var(--accent-primary)',
  pending: 'var(--text-muted)',
  approved: 'var(--status-operational)',
  'early-stage': 'var(--accent-gold)',
};

export default function RegulatoryTracker({ data }) {
  const { regulatory: r } = data;

  return (
    <div className="section">
      <div className="section-title">
        <Shield size={22} /> Regulatory & Commercialization
      </div>

      {/* FCC Authorization highlight */}
      <div className="card" style={{ borderLeft: '3px solid var(--status-operational)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
          <CheckCircle2 size={18} color="var(--status-operational)" />
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>FCC Commercial Authorization Granted</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{r.fccAuthorization.date}</span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{r.fccAuthorization.detail}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Type: {r.fccAuthorization.type} | Bands: {r.fccAuthorization.bands} | Carriers: {r.fccAuthorization.carriers.join(', ')}
        </div>
      </div>

      {/* Commercialization stages */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Commercialization Progress</div>
        {r.commercializationStages.map((stage, i) => {
          const Icon = STATUS_ICONS[stage.status] || Clock;
          const color = STATUS_COLORS[stage.status] || 'var(--text-muted)';
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.5rem 0',
              borderBottom: i < r.commercializationStages.length - 1 ? '1px solid var(--border-secondary)' : 'none',
            }}>
              <Icon size={16} color={color} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color }}>{stage.stage}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stage.detail}</div>
              </div>
              <span className={`badge badge--${stage.status === 'complete' ? 'operational' : stage.status === 'in-progress' ? 'manifested' : 'planned'}`} style={{ marginLeft: 'auto' }}>
                {stage.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* International approvals */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>International Market Approvals</div>
        <div className="grid-2">
          {r.internationalApprovals.map((market, i) => {
            const Icon = STATUS_ICONS[market.status] || Clock;
            const color = STATUS_COLORS[market.status] || 'var(--text-muted)';
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                background: 'var(--bg-secondary)',
                borderRadius: 8,
              }}>
                <Icon size={14} color={color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{market.market}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{market.detail}</div>
                </div>
                <span className={`badge badge--${market.status === 'approved' ? 'operational' : market.status === 'in-progress' ? 'manifested' : 'planned'}`} style={{ fontSize: '0.65rem' }}>
                  {market.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
