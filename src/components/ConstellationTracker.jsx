import { useState } from 'react';
import { Orbit, Rocket, AlertTriangle, CheckCircle2, Clock, XCircle, ChevronDown, X } from 'lucide-react';
import { statusColor } from '../utils/format';

const STATUS_ICONS = {
  operational: CheckCircle2,
  manifested: Rocket,
  planned: Clock,
  lost: XCircle,
  decommissioned: AlertTriangle,
};

function SatDetailPanel({ sat, onClose }) {
  if (!sat) return null;
  const specs = [
    sat.cospar && ['COSPAR', sat.cospar],
    sat.noradId && ['NORAD ID', sat.noradId],
    sat.mass_kg && ['Mass', `${sat.mass_kg.toLocaleString()} kg`],
    sat.arraySize_sqft && ['Array', `${sat.arraySize_sqft.toLocaleString()} sq ft (${sat.arraySize_sqm} m²)`],
    sat.arrayDiameter_m && ['Diameter', `${sat.arrayDiameter_m}m deployed`],
    sat.orbit?.altitude_km && ['Orbit', `${sat.orbit.altitude_km} km`],
    sat.orbit?.inclination_deg && ['Inclination', `${sat.orbit.inclination_deg}°`],
    sat.orbit?.period_min && ['Period', `${sat.orbit.period_min} min`],
    sat.processor && ['Processor', sat.processor],
    sat.bandwidth_mhz && ['Bandwidth', sat.bandwidth_mhz >= 1000 ? `${(sat.bandwidth_mhz/1000).toFixed(0)} GHz` : `${sat.bandwidth_mhz} MHz`],
    sat.peakSpeed_mbps && ['Peak Speed', `${sat.peakSpeed_mbps} Mbps`],
    sat.activeCells && ['Active Cells', `${sat.activeCells.toLocaleString()}+`],
    sat.propulsion && ['Propulsion', sat.propulsion],
    sat.designLife_yr && ['Design Life', `${sat.designLife_yr} years`],
    sat.magnitude && ['Vis. Magnitude', sat.magnitude],
    sat.arrayUnfolded && ['Array Unfolded', sat.arrayUnfolded],
  ].filter(Boolean);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
        borderRadius: 12, padding: '1.5rem', maxWidth: 520, width: '100%',
        maxHeight: '80vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: statusColor(sat.status) }}>
              {sat.id} — {sat.name}
            </div>
            {sat.altName && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sat.altName}</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className={`badge badge--${sat.status}`}>{sat.status}</span>
          <span className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{sat.block}</span>
          {sat.vehicle && <span className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{sat.vehicle}</span>}
        </div>

        {/* Specs table */}
        <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <tbody>
            {specs.map(([label, val], i) => (
              <tr key={i}>
                <td style={{ padding: '5px 8px', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border-secondary)', width: '35%' }}>{label}</td>
                <td style={{ padding: '5px 8px', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-primary)' }}>{val}</td>
              </tr>
            ))}
            {sat.launchDate && (
              <tr>
                <td style={{ padding: '5px 8px', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border-secondary)' }}>Launch Date</td>
                <td style={{ padding: '5px 8px', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border-secondary)' }}>{sat.launchDate}</td>
              </tr>
            )}
            {sat.site && (
              <tr>
                <td style={{ padding: '5px 8px', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border-secondary)' }}>Launch Site</td>
                <td style={{ padding: '5px 8px', borderBottom: '1px solid var(--border-secondary)', fontSize: '0.72rem' }}>{sat.site}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* BW3 Test Results */}
        {sat.testResults && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>🏆 Test Results (World Firsts)</div>
            {sat.testResults.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: '0.73rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', minWidth: 70, flexShrink: 0 }}>{t.date}</span>
                <div>
                  <div style={{ color: 'var(--text-primary)' }}>{t.test}</div>
                  {t.speed && <div style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>↑ {t.speed}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Failure detail */}
        {sat.failureDetail && (
          <div style={{ padding: '0.75rem', background: 'rgba(255,77,77,0.08)', border: '1px solid rgba(255,77,77,0.2)', borderRadius: 8, marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--status-lost)', marginBottom: 6 }}>⚠️ Failure Analysis</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div><strong>Cause:</strong> {sat.failureDetail.cause}</div>
              <div><strong>Result:</strong> {sat.failureDetail.result}</div>
              <div><strong>Insurance:</strong> {sat.failureDetail.insurance}</div>
              {sat.failureDetail.faaAction && <div><strong>FAA:</strong> {sat.failureDetail.faaAction}</div>}
              {sat.failureDetail.impact && <div><strong>Impact:</strong> {sat.failureDetail.impact}</div>}
            </div>
          </div>
        )}

        {/* Notes */}
        <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.5, padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: 6 }}>
          {sat.notes}
        </div>

        {(sat.source || sat.links) && (
          <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-secondary)', paddingTop: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>🔗 Links & Tracking</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.65rem' }}>
              {sat.source && (
                <a href={sat.source} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>📖 Gunter&apos;s</a>
              )}
              {sat.links?.n2yo && (
                <a href={sat.links.n2yo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🛰️ N2YO Live</a>
              )}
              {sat.links?.celestrak && (
                <a href={sat.links.celestrak} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>📡 CelesTrak TLE</a>
              )}
              {sat.links?.astsats && (
                <a href={sat.links.astsats} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🌍 ASTSats.com</a>
              )}
              {sat.links?.keeptrack && (
                <a href={sat.links.keeptrack} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🔭 KeepTrack</a>
              )}
              {sat.links?.supercluster && (
                <a href={sat.links.supercluster} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🚀 Supercluster</a>
              )}
              {sat.links?.nextspaceflight && (
                <a href={sat.links.nextspaceflight} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🚀 NextSpaceflight</a>
              )}
              {sat.links?.launch && (
                <a href={sat.links.launch} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none', padding: '3px 8px', background: 'var(--bg-secondary)', borderRadius: 4 }}>🚀 Launch Info</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConstellationTracker({ data }) {
  const { constellation: c, satellites } = data;
  const [selectedSat, setSelectedSat] = useState(null);

  const operational = satellites.filter(s => s.status === 'operational').length;
  const lost = satellites.filter(s => s.status === 'lost').length;
  const manifested = satellites.filter(s => s.status === 'manifested').length;

  const kpis = [
    { label: 'In Orbit (Operational)', value: operational, color: 'var(--status-operational)' },
    { label: 'Lost', value: lost, color: 'var(--status-lost)' },
    { label: 'Manifested (Next Launch)', value: manifested, color: 'var(--status-manifested)' },
    { label: 'FCC Authorized', value: c.authorized, color: 'var(--accent-primary)' },
  ];

  const thresholds = Object.entries(c.coverageThresholds);

  return (
    <div className="section">
      <div className="section-title">
        <Orbit size={22} /> Constellation Status
      </div>

      {/* KPI cards */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map((k, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: k.color }}>{k.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars for coverage thresholds */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Coverage Milestones</div>
        {thresholds.map(([key, t]) => {
          const pct = Math.min(100, (operational / t.sats) * 100);
          return (
            <div key={key} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                <span style={{ color: 'var(--text-primary)' }}>{t.description}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{operational}/{t.sats} sats</span>
              </div>
              <div style={{ height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: pct >= 100 ? 'var(--status-operational)' : 'var(--accent-primary)',
                  borderRadius: 4,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Satellite visual grid — CLICKABLE */}
      <div className="card">
        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          All Satellites <span style={{ fontWeight: 400, fontSize: '0.7rem', color: 'var(--text-muted)' }}>— click for specs</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {satellites.map((sat) => {
            const Icon = STATUS_ICONS[sat.status] || Clock;
            return (
              <div
                key={sat.id}
                onClick={() => setSelectedSat(sat)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px 10px',
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${statusColor(sat.status)}33`,
                  borderRadius: 8,
                  minWidth: 80,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = statusColor(sat.status);
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = statusColor(sat.status) + '33';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={16} color={statusColor(sat.status)} />
                <div style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 4, color: statusColor(sat.status) }}>
                  {sat.id}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sat.block}</div>
                {sat.mass_kg && <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{(sat.mass_kg/1000).toFixed(1)}t</div>}
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.7rem' }}>
          {Object.entries(STATUS_ICONS).map(([status, Icon]) => (
            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon size={12} color={statusColor(status)} />
              <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing capacity */}
      {c.manufacturingCapacity && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="grid-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{c.manufacturingRate}/mo</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Production Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{c.annualCapacity}/yr</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Annual Capacity</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{c.costPerSat}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cost per Satellite</div>
            </div>
          </div>
        </div>
      )}

      {/* FCC deadlines */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>FCC Deployment Deadlines</div>
        <div className="grid-2">
          <div style={{ padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>50% Constellation</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{c.fccDeadlines.halfConstellation.count} sats by {c.fccDeadlines.halfConstellation.deadline}</div>
          </div>
          <div style={{ padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: 8 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Full Constellation</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{c.fccDeadlines.fullConstellation.count} sats by {c.fccDeadlines.fullConstellation.deadline}</div>
          </div>
        </div>
      </div>

      {/* Satellite detail modal */}
      {selectedSat && <SatDetailPanel sat={selectedSat} onClose={() => setSelectedSat(null)} />}
    </div>
  );
}
