import { Rocket, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDate, statusColor } from '../utils/format';

const STATUS_META = {
  operational: { icon: CheckCircle2, label: 'SUCCESS' },
  lost: { icon: XCircle, label: 'LOST' },
  manifested: { icon: Rocket, label: 'UPCOMING' },
  planned: { icon: Clock, label: 'PLANNED' },
  decommissioned: { icon: AlertTriangle, label: 'DECOM' },
};

export default function LaunchTimeline({ data }) {
  const { satellites } = data;

  // Group by launch date
  const launches = [];
  const seen = new Set();
  for (const sat of satellites) {
    const key = sat.launchDate + '|' + sat.vehicle;
    if (!seen.has(key)) {
      seen.add(key);
      launches.push({
        date: sat.launchDate,
        vehicle: sat.vehicle,
        site: sat.site,
        sats: satellites.filter(s => s.launchDate === sat.launchDate && s.vehicle === sat.vehicle),
        status: sat.status,
      });
    }
  }

  return (
    <div className="section">
      <div className="section-title">
        <Rocket size={22} /> Launch Timeline
      </div>

      <div style={{ position: 'relative', paddingLeft: 40 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 16,
          top: 0,
          bottom: 0,
          width: 2,
          background: 'var(--border-primary)',
        }} />

        {launches.map((launch, i) => {
          const meta = STATUS_META[launch.status] || STATUS_META.planned;
          const Icon = meta.icon;
          const isPast = ['operational', 'lost', 'decommissioned'].includes(launch.status);

          return (
            <div key={i} style={{ position: 'relative', marginBottom: '1.5rem' }}>
              {/* Dot on timeline */}
              <div style={{
                position: 'absolute',
                left: -32,
                top: 6,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: statusColor(launch.status),
                border: '2px solid var(--bg-primary)',
                zIndex: 1,
              }} />

              <div className="card" style={{ opacity: isPast ? 1 : 0.85 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={16} color={statusColor(launch.status)} />
                      <span className={`badge badge--${launch.status}`}>{meta.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
                        {formatDate(launch.date)}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      {launch.vehicle} — {launch.site}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                    {launch.sats.length} sat{launch.sats.length > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Satellites in this launch */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {launch.sats.map(sat => (
                    <div key={sat.id} style={{
                      padding: '4px 10px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      border: `1px solid ${statusColor(sat.status)}33`,
                    }}>
                      <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: statusColor(sat.status) }}>{sat.id}</span>
                      <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{sat.block}</span>
                      {sat.arraySize && <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{sat.arraySize.toLocaleString()} sq ft</span>}
                    </div>
                  ))}
                </div>

                {/* Notes for notable launches */}
                {launch.sats.some(s => s.status === 'lost') && (
                  <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(239,68,68,0.08)', borderRadius: 6, fontSize: '0.75rem', color: 'var(--status-lost)' }}>
                    ⚠️ {launch.sats.find(s => s.status === 'lost')?.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
