import { useState, useMemo } from 'react';
import { Satellite, DollarSign, Activity, Clock, ChevronDown, ChevronUp, Rocket, AlertTriangle, Eye } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercent } from '../utils/format';

const pulseKeyframes = `
@keyframes pulse-glow {
  0%, 100% { opacity: 1; text-shadow: 0 0 6px var(--status-operational); }
  50% { opacity: 0.85; text-shadow: 0 0 14px var(--status-operational), 0 0 24px var(--status-operational); }
}
@keyframes sat-glow {
  0%, 100% { filter: drop-shadow(0 0 4px var(--accent-gold)); }
  50% { filter: drop-shadow(0 0 12px var(--accent-gold)) drop-shadow(0 0 20px var(--accent-gold)); }
}
@keyframes price-glow {
  0%, 100% { text-shadow: 0 0 8px rgba(59,130,246,0.3); }
  50% { text-shadow: 0 0 16px rgba(59,130,246,0.5); }
}
`;

export default function CompanyHeader({ data }) {
  const { overview, marketData, constellation, catalysts } = data;
  const m = marketData;
  const [analystExpanded, setAnalystExpanded] = useState(false);

  // Constellation status counts
  const sats = data.satellites || [];
  const statusCounts = useMemo(() => {
    const counts = { operational: 0, lost: 0, manifested: 0 };
    sats.forEach(s => {
      if (s.status === 'operational') counts.operational++;
      else if (s.status === 'lost') counts.lost++;
      else if (s.status === 'manifested') counts.manifested++;
    });
    return counts;
  }, [sats]);

  // Next catalyst
  const nextCatalyst = useMemo(() => {
    if (!catalysts) return null;
    const now = new Date();
    const upcoming = catalysts
      .filter(c => {
        if (!c.date) return false;
        const d = new Date(c.date);
        return !isNaN(d.getTime()) && d > now;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (upcoming.length === 0) return null;
    const c = upcoming[0];
    const diffMs = new Date(c.date) - now;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return { ...c, daysUntil: days };
  }, [catalysts]);

  // 52W range position (0-100%)
  const rangePercent = ((m.price - m.fiftyTwoWeekLow) / (m.fiftyTwoWeekHigh - m.fiftyTwoWeekLow)) * 100;

  const kpiStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-primary)',
    borderRadius: 10,
    padding: '1rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  };

  const kpiLabel = {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: 500,
  };

  const kpiValue = {
    fontSize: '1.5rem',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-primary)',
  };

  return (
    <div className="section" style={{ paddingBottom: '2rem' }}>
      <style>{pulseKeyframes}</style>

      {/* ── Hero Top: Ticker + Tagline + Satellite Icon ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Satellite
            size={44}
            color="var(--accent-gold)"
            style={{ animation: 'sat-glow 3s ease-in-out infinite' }}
          />
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-mono)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {overview.ticker}
            </h1>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1, marginTop: '0.15rem' }}>
              Cell Towers in Space™
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{overview.name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Data as of {new Date(overview.asOf).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</div>
        </div>
      </div>

      {/* ── Mission Status Strip ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.6rem 1rem',
        background: 'linear-gradient(90deg, rgba(34,197,94,0.08), rgba(59,130,246,0.08), rgba(139,92,246,0.06))',
        border: '1px solid var(--border-primary)',
        borderRadius: 8,
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600, marginRight: '0.5rem' }}>
          CONSTELLATION
        </div>
        {[
          { count: statusCounts.operational, label: 'OPERATIONAL', color: 'var(--status-operational)', pulse: true },
          { count: statusCounts.lost, label: 'LOST', color: 'var(--status-lost)', pulse: false },
          { count: statusCounts.manifested, label: 'MANIFESTED', color: 'var(--status-manifested)', pulse: false },
          { count: constellation?.authorized || 248, label: 'AUTHORIZED', color: 'var(--accent-secondary)', pulse: false },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '3px 10px',
            background: 'var(--bg-card)',
            border: `1px solid ${s.color}33`,
            borderRadius: 6,
          }}>
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: s.color,
              ...(s.pulse ? { animation: 'pulse-glow 2.5s ease-in-out infinite' } : {}),
            }}>
              {s.count}
            </span>
            <span style={{ fontSize: '0.65rem', color: s.color, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Hero KPI Grid: Row 1 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={kpiStyle}>
          <div style={kpiLabel}><DollarSign size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Price</div>
          <div style={{ ...kpiValue, color: 'var(--accent-primary)', animation: 'price-glow 3s ease-in-out infinite' }}>{formatPrice(m.price)}</div>
        </div>
        <div style={kpiStyle}>
          <div style={kpiLabel}>Market Cap</div>
          <div style={kpiValue}>{formatMarketCap(m.marketCap)}</div>
        </div>
        <div style={kpiStyle}>
          <div style={kpiLabel}>Enterprise Value</div>
          <div style={kpiValue}>{formatMarketCap(m.enterpriseValue)}</div>
        </div>
        <div style={kpiStyle}>
          <div style={kpiLabel}>Cash</div>
          <div style={{ ...kpiValue, color: 'var(--status-operational)' }}>{formatMarketCap(m.totalCash)}</div>
        </div>
      </div>

      {/* ── Hero KPI Grid: Row 2 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {/* Short Interest */}
        <div style={kpiStyle}>
          <div style={kpiLabel}><AlertTriangle size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Short Interest</div>
          <div style={{ ...kpiValue, color: m.shortPercentOfFloat > 0.15 ? 'var(--status-lost)' : 'var(--text-primary)' }}>
            {(m.shortPercentOfFloat * 100).toFixed(1)}%
          </div>
        </div>

        {/* Beta */}
        <div style={kpiStyle}>
          <div style={kpiLabel}><Activity size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Beta</div>
          <div style={kpiValue}>{m.beta?.toFixed(2) || 'N/A'}</div>
        </div>

        {/* 52W Range Bar */}
        <div style={kpiStyle}>
          <div style={kpiLabel}>52W Range</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatPrice(m.fiftyTwoWeekLow)}</span>
            <div style={{ flex: 1, position: 'relative', height: 8, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'visible' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0,
                height: '100%', width: `${rangePercent}%`,
                background: 'linear-gradient(90deg, var(--status-lost), var(--accent-gold), var(--status-operational))',
                borderRadius: 4,
              }} />
              <div style={{
                position: 'absolute',
                top: '50%', left: `${rangePercent}%`,
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12,
                background: 'var(--accent-primary)',
                border: '2px solid var(--text-primary)',
                borderRadius: '50%',
                zIndex: 1,
              }} />
            </div>
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatPrice(m.fiftyTwoWeekHigh)}</span>
          </div>
        </div>

        {/* Next Catalyst */}
        <div style={kpiStyle}>
          <div style={kpiLabel}><Rocket size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />Next Catalyst</div>
          {nextCatalyst ? (
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                T-{nextCatalyst.daysUntil}d
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.1rem', lineHeight: 1.3 }}>
                {nextCatalyst.event}
              </div>
            </div>
          ) : (
            <div style={{ ...kpiValue, fontSize: '1rem' }}>—</div>
          )}
        </div>
      </div>

      {/* ── Analyst Targets (Collapsible) ── */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setAnalystExpanded(!analystExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 1rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={14} color="var(--accent-gold)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              {m.analystCount || m.analystRatings?.length || 0} Analysts
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Avg {formatPrice(m.analystTargetAvg)}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ({formatPrice(m.analystTargetLow)} — {formatPrice(m.analystTargetHigh)})
            </span>
          </div>
          {analystExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {analystExpanded && m.analystRatings && (
          <div style={{ padding: '0 1rem 0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {m.analystRatings.map((r, i) => (
              <div key={i} style={{
                padding: '4px 12px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 8,
                fontSize: '0.75rem',
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.firm}</span>
                <span style={{ margin: '0 6px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>${r.target}</span>
                <span className={`badge badge--${r.rating === 'Buy' ? 'operational' : r.rating === 'Neutral' || r.rating === 'Equal Weight' || r.rating === 'Sector Perform' ? 'planned' : 'lost'}`}>
                  {r.rating}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
