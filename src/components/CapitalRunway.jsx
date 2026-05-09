import { Wallet, AlertTriangle } from 'lucide-react';
import { formatMillions, formatMarketCap } from '../utils/format';

export default function CapitalRunway({ data }) {
  const { capital: c } = data;

  return (
    <div className="section">
      <div className="section-title">
        <Wallet size={22} /> Capital & Runway
      </div>

      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Cash Position</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-operational)' }}>
            {formatMarketCap(c.cashPosition)}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quarterly Burn</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-lost)' }}>
            {c.quarterlyBurnRate}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Est. Runway</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
            {c.estimatedRunway}
          </div>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Deployment Economics</div>
        <div className="grid-2">
          <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cost Per Satellite (Block 2)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem' }}>{c.costPerSatellite}</div>
          </div>
          {Object.entries(c.costPerLaunch).map(([vehicle, cost]) => (
            <div key={vehicle} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Launch Cost ({vehicle})</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem' }}>{cost}</div>
            </div>
          ))}
          <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Est. Cost to 45 Sats</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--risk-high)' }}>{c.costTo45Sats}</div>
          </div>
        </div>
      </div>

      {/* Manufacturing */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Manufacturing Capability</div>
        <div className="grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{c.manufacturingCapex.capacity}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Production Rate</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{c.manufacturingCapex.facilities}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Facility Size</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-operational)' }}>{c.manufacturingCapex.integration}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Vertical Integration</div>
          </div>
        </div>
      </div>

      {/* Funding sources */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Funding Sources</div>
        {c.fundingSources.map((s, i) => (
          <div key={i} style={{ padding: '4px 0', fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--accent-primary)' }}>›</span> {s}
          </div>
        ))}
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(249,115,22,0.08)', borderRadius: 6, fontSize: '0.75rem', color: 'var(--risk-high)' }}>
          <AlertTriangle size={14} style={{ verticalAlign: -3, marginRight: 6 }} />
          {c.dilutionRisk}
        </div>
      </div>
    </div>
  );
}
