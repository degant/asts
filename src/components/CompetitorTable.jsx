import { Swords } from 'lucide-react';

export default function CompetitorTable({ data }) {
  const { competitors } = data;
  const cols = ['Metric', ...competitors.map(c => c.name)];
  const rows = [
    { label: 'Sats Live', key: 'satsLive' },
    { label: 'Service Level', key: 'serviceLevel' },
    { label: 'Speed', key: 'speed' },
    { label: 'Coverage', key: 'coverage' },
    { label: 'Subscribers', key: 'subscribers' },
    { label: 'Pricing', key: 'pricing' },
    { label: 'Key Advantage', key: 'advantage' },
    { label: 'Key Weakness', key: 'weakness' },
    { label: 'Status', key: 'status' },
  ];

  const isASTS = (c) => c.name.includes('AST SpaceMobile');

  return (
    <div className="section">
      <div className="section-title">
        <Swords size={22} /> Competitive Landscape
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr>
              {cols.map((col, i) => (
                <th key={i} style={{
                  padding: '10px 12px',
                  textAlign: 'left',
                  background: 'var(--bg-secondary)',
                  borderBottom: '2px solid var(--border-primary)',
                  color: i === 0 ? 'var(--text-muted)' : competitors[i-1] && isASTS(competitors[i-1]) ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  position: 'sticky',
                  top: 0,
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {row.label}
                </td>
                {competitors.map((c, ci) => (
                  <td key={ci} style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--border-secondary)',
                    color: isASTS(c) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    background: isASTS(c) ? 'rgba(59,130,246,0.04)' : 'transparent',
                    maxWidth: 200,
                  }}>
                    {c[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
