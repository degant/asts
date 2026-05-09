import { BarChart3, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { formatMillions } from '../utils/format';

export default function FinancialSnapshot({ data }) {
  const { financials: f } = data;

  const chartData = f.quarterly.map(q => ({
    period: q.period,
    revenue: q.revenue,
    netIncome: q.netIncome,
  }));

  return (
    <div className="section">
      <div className="section-title">
        <BarChart3 size={22} /> Financial Snapshot
      </div>

      {/* Key metrics */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'FY2025 Revenue', value: formatMillions(f.annual[f.annual.length-1]?.revenue), color: 'var(--status-operational)' },
          { label: 'FY2025 Net Loss', value: '-' + formatMillions(Math.abs(f.annual[f.annual.length-1]?.netIncome)), color: 'var(--status-lost)' },
          { label: 'Cash Position', value: formatMillions(f.balanceSheet.cash / 1e6), color: 'var(--accent-primary)' },
          { label: 'Contracted Backlog', value: formatMillions(f.balanceSheet.backlog / 1e6), color: 'var(--accent-gold)' },
        ].map((m, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Quarterly chart */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem' }}>Quarterly Revenue & Net Income ($M)</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
            <XAxis dataKey="period" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 8 }}
              labelStyle={{ color: 'var(--text-primary)' }}
              formatter={(v) => [`$${v.toFixed(1)}M`]}
            />
            <ReferenceLine y={0} stroke="var(--border-primary)" />
            <Bar dataKey="revenue" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar dataKey="netIncome" fill="var(--status-lost)" radius={[4, 4, 0, 0]} name="Net Income" opacity={0.6} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Annual table */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Annual Summary</div>
        <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Year', 'Revenue', 'Net Income', 'EPS'].map(h => (
                <th key={h} style={{ padding: '6px 12px', textAlign: 'right', borderBottom: '1px solid var(--border-primary)', color: 'var(--text-muted)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.annual.map((yr, i) => (
              <tr key={i}>
                <td style={{ padding: '6px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{yr.year}</td>
                <td style={{ padding: '6px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{formatMillions(yr.revenue)}</td>
                <td style={{ padding: '6px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--status-lost)' }}>-{formatMillions(Math.abs(yr.netIncome))}</td>
                <td style={{ padding: '6px 12px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>${yr.eps.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Q1 2026 upcoming */}
      <div className="card" style={{ marginTop: '1rem', borderLeft: '3px solid var(--accent-gold)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>📅 Q1 2026 Earnings — May 11, 2026 (After Close)</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>{f.guidance2026.notes}</div>
      </div>
    </div>
  );
}
