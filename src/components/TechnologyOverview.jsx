import { Cpu } from 'lucide-react';

export default function TechnologyOverview({ data }) {
  const { blockComparison: bc, launchProviders } = data;
  const specs = [
    { label: 'Array Size', b1: bc.block1.arraySize, b2: bc.block2.arraySize },
    { label: 'Weight', b1: bc.block1.weight, b2: bc.block2.weight },
    { label: 'Capacity', b1: bc.block1.capacity, b2: bc.block2.capacity },
    { label: 'Peak Speed', b1: bc.block1.peakSpeed, b2: bc.block2.peakSpeed },
    { label: 'Bands', b1: bc.block1.bands, b2: bc.block2.bands },
    { label: 'Processor', b1: bc.block1.processor, b2: bc.block2.processor },
    { label: 'Count', b1: bc.block1.count, b2: bc.block2.count },
    { label: 'First Launch', b1: bc.block1.firstLaunch, b2: bc.block2.firstLaunch },
  ];

  return (
    <div className="section">
      <div className="section-title">
        <Cpu size={22} /> Technology Overview
      </div>

      {/* Block comparison table */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Block 1 vs Block 2 Satellite Specs</div>
        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-primary)', color: 'var(--text-muted)' }}>Specification</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '2px solid var(--border-primary)', color: 'var(--text-secondary)' }}>{bc.block1.name}</th>
              <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '2px solid var(--border-primary)', color: 'var(--accent-gold)' }}>{bc.block2.name}</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{s.b1}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{s.b2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Launch providers */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Launch Providers</div>
        <div className="grid-3">
          {launchProviders.map((lp, i) => (
            <div key={i} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 8, border: `1px solid ${lp.status === 'active' ? 'var(--status-operational)' : lp.status === 'grounded' ? 'var(--status-lost)' : 'var(--border-primary)'}33` }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{lp.name}</div>
              <span className={`badge badge--${lp.status === 'active' ? 'operational' : lp.status === 'grounded' ? 'lost' : 'planned'}`}>{lp.status}</span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                <div>Capacity: {lp.capacity}</div>
                <div>Est. cost: {lp.costEstimate}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>{lp.notes}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
