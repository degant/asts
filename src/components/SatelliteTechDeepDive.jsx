import { Cpu, Radio, Rocket, Shield, Zap, Activity } from 'lucide-react';

const monoVal = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 700,
  color: 'var(--accent-primary)',
};

const specRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.4rem 0',
  borderBottom: '1px solid var(--border-secondary)',
};

const specLabel = {
  fontSize: '0.78rem',
  color: 'var(--text-secondary)',
};

const specValue = {
  fontSize: '0.82rem',
  ...monoVal,
  textAlign: 'right',
  maxWidth: '60%',
};

function SectionCard({ icon: Icon, title, color, children, accentBorder }) {
  return (
    <div className="card" style={{
      padding: '1.25rem',
      marginBottom: '1rem',
      borderTop: accentBorder ? `2px solid ${accentBorder}` : undefined,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <Icon size={20} color={color || 'var(--accent-primary)'} />
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SpecTable({ specs }) {
  return (
    <div>
      {specs.map(([label, value], i) => (
        <div key={i} style={specRow}>
          <span style={specLabel}>{label}</span>
          <span style={specValue}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function SatelliteTechDeepDive({ data }) {
  const tech = data.satelliteTech;
  if (!tech) return null;

  const { rfSpecs, asic, orbital, physical, bw3TestResults, investorSignificance } = tech;

  const depthColors = { Deep: 'var(--status-operational)', Medium: 'var(--accent-gold)', Wide: 'var(--accent-primary)' };

  return (
    <div className="section">
      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity size={22} color="var(--accent-cyan)" />
        Satellite Technical Deep-Dive
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* RF & Link Budget */}
        <SectionCard icon={Radio} title="RF & Link Budget" color="var(--accent-cyan)">
          <SpecTable specs={[
            ['EIRP', rfSpecs.eirp],
            ['Antenna Gain', rfSpecs.antennaGain],
            ['Bandwidth / Beam', rfSpecs.bandwidthPerBeam],
            ['Peak Speed / Cell', rfSpecs.peakSpeedPerCell],
            ['Processing BW', rfSpecs.processingBandwidth],
            ['Active Cells', rfSpecs.activeCells],
            ['Dynamic Cells', rfSpecs.maxDynamicCells],
            ['Peak Users / Sat', rfSpecs.peakUsersPerSat],
            ['≈ Cell Towers', rfSpecs.equivalentCellTowers],
          ]} />
        </SectionCard>

        {/* AST5000 ASIC */}
        <SectionCard icon={Cpu} title={`${asic.name} — Custom ASIC`} color="var(--accent-gold)" accentBorder="var(--accent-gold)">
          <SpecTable specs={[
            ['Fabrication', asic.fabrication],
            ['EDA Partner', asic.edaPartner],
            ['Processing BW', asic.processingBandwidth],
            ['Development', asic.development],
            ['Patents', asic.patents],
          ]} />
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: '0.4rem' }}>Features</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', listStyle: 'none' }}>
              {asic.features.map((f, i) => (
                <li key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.2rem', position: 'relative' }}>
                  <Zap size={10} color="var(--accent-gold)" style={{ position: 'absolute', left: '-1.1rem', top: '0.2rem' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{
            marginTop: '0.75rem',
            padding: '0.6rem 0.75rem',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: 6,
            fontSize: '0.78rem',
            color: 'var(--accent-gold)',
            fontStyle: 'italic',
            lineHeight: 1.4,
          }}>
            "{asic.significance}"
          </div>
        </SectionCard>

        {/* Orbital Mechanics */}
        <SectionCard icon={Rocket} title="Orbital Mechanics" color="var(--accent-secondary)">
          <SpecTable specs={[
            ['Altitude', orbital.altitude],
            ['Inclination', orbital.inclination],
            ['Period', orbital.period],
            ['Pass Duration', orbital.passDuration],
            ['Ground Track', orbital.groundTrack],
            ['Coverage / Sat', orbital.coveragePerSat],
            ['Orbital Speed', orbital.orbitalSpeed],
            ['Design Life', orbital.designLife],
            ['Propulsion', orbital.propulsion],
            ['Power', orbital.power],
          ]} />
        </SectionCard>

        {/* Physical Specs */}
        <SectionCard icon={Rocket} title="Physical Specs (Block 2)" color="var(--accent-primary)">
          <SpecTable specs={[
            ['Array Area', physical.arrayArea],
            ['Array Diameter', physical.arrayDiameter],
            ['Mass', physical.mass],
            ['Deployment', physical.deploymentMethod],
            ['Thermal', physical.thermalControl],
            ['Attitude Control', physical.attitude],
            ['Data Downlink', physical.dataDownlink],
          ]} />
        </SectionCard>
      </div>

      {/* BlueWalker 3 Test Results — full width */}
      <SectionCard icon={Zap} title="BlueWalker 3 — The Proof" color="var(--status-operational)">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '1rem' }}>
          {bw3TestResults.description}
        </p>
        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute', left: 5, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(180deg, var(--status-operational), var(--accent-primary))',
          }} />
          {bw3TestResults.milestones.map((m, i) => (
            <div key={i} style={{ marginBottom: '1rem', position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: '-1.5rem', top: 2,
                width: 12, height: 12, borderRadius: '50%',
                background: m.speed ? 'var(--status-operational)' : 'var(--accent-primary)',
                border: '2px solid var(--bg-card)',
              }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', minWidth: 65 }}>{m.date}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, flex: 1 }}>{m.achievement}</span>
                {m.speed && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800,
                    color: 'var(--status-operational)',
                    whiteSpace: 'nowrap',
                  }}>
                    {m.speed} ↑
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{m.details}</div>
            </div>
          ))}
        </div>
        {/* Key Insight callout */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem 1rem',
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderLeft: '3px solid var(--status-operational)',
          borderRadius: 6,
          fontSize: '0.82rem',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          fontWeight: 500,
        }}>
          <strong style={{ color: 'var(--status-operational)' }}>KEY INSIGHT:</strong> {bw3TestResults.keyInsight}
        </div>
      </SectionCard>

      {/* Competitive Moats */}
      <SectionCard icon={Shield} title="Competitive Moats" color="var(--accent-primary)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {investorSignificance.moats.map((m, i) => (
            <div key={i} style={{
              padding: '0.75rem 1rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 8,
              borderLeft: `3px solid ${depthColors[m.depth] || 'var(--text-muted)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.name}</span>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  padding: '2px 8px',
                  borderRadius: 4,
                  color: depthColors[m.depth],
                  background: `${depthColors[m.depth]}15`,
                  border: `1px solid ${depthColors[m.depth]}33`,
                }}>
                  {m.depth}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{m.reason}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Sources */}
      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        Sources: {tech.sources.join(' • ')} | As of {tech.asOf}
      </div>
    </div>
  );
}
