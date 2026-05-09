import { Receipt } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const SCENARIO_COLORS = {
  Bear: 'var(--status-lost)',
  Base: 'var(--accent-primary)',
  Bull: 'var(--status-operational)',
};

export default function RevenueModel({ data }) {
  const { revenueModel: rm } = data;

  const scenarioData = rm.scenarioAnalysis.map(s => ({
    name: s.scenario,
    revenue: parseFloat(s.annualRevenue.replace(/[^0-9.]/g, '')),
    penetration: s.penetration,
    arpu: s.arpu,
    notes: s.notes,
  }));

  return (
    <div className="section">
      <div className="section-title">
        <Receipt size={22} /> Revenue Model & Scenarios
      </div>

      {/* Business model overview */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="grid-2">
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Business Model</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{rm.businessModel}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Revenue Share</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{rm.revenueShare}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Addressable Market</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>{rm.addressableMarket}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>ARPU Estimate</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)' }}>{rm.arpuEstimate}</div>
          </div>
        </div>
      </div>

      {/* Scenario chart */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Revenue Scenarios (Annual, at Scale)</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={scenarioData} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 13 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={(v) => `$${v}B`} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 8 }}
              formatter={(v) => [`$${v}B`]}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} name="Revenue">
              {scenarioData.map((entry, i) => (
                <Cell key={i} fill={SCENARIO_COLORS[entry.name] || 'var(--accent-primary)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario details table */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Scenario', 'Penetration', 'ARPU/mo', 'Annual Rev', 'Assumption'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-primary)', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rm.scenarioAnalysis.map((s, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', fontWeight: 700, color: SCENARIO_COLORS[s.scenario] }}>{s.scenario}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', fontFamily: 'var(--font-mono)' }}>{s.penetration}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', fontFamily: 'var(--font-mono)' }}>${s.arpu}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{s.annualRevenue}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-secondary)' }}>{s.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key contracts */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Key Contracts</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
          {rm.backlog} Contracted Backlog
        </div>
        {rm.keyContracts.map((k, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '6px 0',
            borderBottom: i < rm.keyContracts.length - 1 ? '1px solid var(--border-secondary)' : 'none',
            fontSize: '0.8rem',
          }}>
            <span style={{ fontWeight: 600 }}>{k.partner}</span>
            <span style={{ color: 'var(--text-muted)' }}>{k.value}</span>
            <span style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem' }}>{k.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
