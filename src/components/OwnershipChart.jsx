import { Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { formatMarketCap } from '../utils/format';

function DonutChart({ data }) {
  const r = 70;
  const cx = 85;
  const cy = 85;
  const strokeWidth = 35;
  const circumference = 2 * Math.PI * r;
  let accumulated = 0;

  return (
    <svg viewBox="0 0 170 170" style={{ width: 220, height: 220, flexShrink: 0 }}>
      {data.map((slice, i) => {
        const sliceLen = (slice.pct / 100) * circumference;
        const offset = -(accumulated / 100) * circumference;
        accumulated += slice.pct;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${sliceLen} ${circumference - sliceLen}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dasharray 0.3s' }}
          >
            <title>{slice.label}: {slice.pct}%</title>
          </circle>
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="700" fontFamily="var(--font-mono)">298.7M</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text-muted)" fontSize="7">Shares Outstanding</text>
    </svg>
  );
}

function OwnershipBar({ label, pct, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{(pct * 100).toFixed(1)}%</span>
      </div>
      <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

export default function OwnershipChart({ data }) {
  const o = data.ownership;
  if (!o) return null;

  const sorted = [...o.donutData].sort((a, b) => b.pct - a.pct);

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2 className="section-title"><Users size={18} style={{ marginRight: 8 }} />Ownership Structure</h2>

      {/* Donut + Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <DonutChart data={o.donutData} />

        <div style={{ flex: 1, minWidth: 300, overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '4px 8px' }}></th>
                <th style={{ padding: '4px 8px' }}>Holder</th>
                <th style={{ padding: '4px 8px', textAlign: 'right' }}>%</th>
                <th style={{ padding: '4px 8px', textAlign: 'right' }}>Shares</th>
                <th style={{ padding: '4px 8px', textAlign: 'right' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-secondary)' }}>
                  <td style={{ padding: '4px 8px' }}>
                    <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                  </td>
                  <td style={{ padding: '4px 8px', color: 'var(--text-primary)' }}>{s.label}</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{s.pct.toFixed(2)}%</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{s.shares.toLocaleString()}</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{formatMarketCap(s.shares * (data.overview?.price || 75))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ownership Summary Bars */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
          <DollarSign size={14} style={{ marginRight: 6 }} />Ownership Summary
        </h3>
        <OwnershipBar label="Insiders" pct={o.insiderOwnership} color="#FFD700" />
        <OwnershipBar label="Institutions" pct={o.institutionalOwnership} color="#3B82F6" />
        <OwnershipBar label="Retail / Public" pct={o.retailOwnership} color="#9CA3AF" />
      </div>

      {/* Recent Insider Trades */}
      <div>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
          Recent Insider Trades
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '4px 8px' }}>Date</th>
                <th style={{ padding: '4px 8px' }}>Name</th>
                <th style={{ padding: '4px 8px' }}>Action</th>
                <th style={{ padding: '4px 8px', textAlign: 'right' }}>Shares</th>
                <th style={{ padding: '4px 8px', textAlign: 'right' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {o.recentInsiderTrades.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-secondary)' }}>
                  <td style={{ padding: '4px 8px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{t.date}</td>
                  <td style={{ padding: '4px 8px', color: 'var(--text-primary)' }}>
                    {t.insider}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginLeft: 4 }}>{t.title}</span>
                  </td>
                  <td style={{ padding: '4px 8px' }}>
                    <span style={{
                      color: t.action === 'Sale' ? 'var(--risk-high, #EF4444)' : 'var(--status-operational, #22C55E)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                    }}>
                      {t.action === 'Sale' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                      {t.action}
                    </span>
                  </td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{t.shares.toLocaleString()}</td>
                  <td style={{ padding: '4px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{t.value > 0 ? formatMarketCap(t.value) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
        Sources: {o.sources.join(' · ')} | As of {o.asOf}
      </div>
    </section>
  );
}
