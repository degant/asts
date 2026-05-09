import { ExternalLink, Users, Radio, GitFork, Star, UserCheck, Building2 } from 'lucide-react';

const linkStyle = {
  color: 'var(--accent-primary)',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  transition: 'color 0.2s',
};

function LinkCard({ name, url, description, icon, extra }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      ...linkStyle,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      padding: '0.75rem 1rem',
      background: 'var(--bg-tertiary)',
      borderRadius: 8,
      border: '1px solid var(--border-primary)',
      color: 'var(--text-primary)',
      transition: 'all 0.2s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {icon && <span style={{ fontSize: '1.1rem' }}>{icon}</span>}
        <span style={{ fontWeight: 600, fontSize: '0.85rem', flex: 1 }}>{name}</span>
        <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      </div>
      {description && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{description}</div>}
      {extra && <div style={{ fontSize: '0.7rem', color: 'var(--accent-gold)' }}>{extra}</div>}
    </a>
  );
}

function PersonCard({ person }) {
  // reliability ratings removed per user request
  return (
    <div style={{
      padding: '1rem',
      background: 'var(--bg-tertiary)',
      borderRadius: 8,
      border: '1px solid var(--border-primary)',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <UserCheck size={14} style={{ color: 'var(--accent-primary)' }} />
        <a href={person.url} target="_blank" rel="noopener noreferrer" style={{
          ...linkStyle,
          fontWeight: 700,
          fontSize: '0.9rem',
        }}>
          {person.name}
        </a>
      </div>
      {person.role && <div style={{
        fontSize: '0.72rem',
        color: 'var(--accent-gold)',
        fontWeight: 600,
        marginBottom: 4,
        padding: '2px 6px',
        background: 'rgba(255,215,0,0.08)',
        borderRadius: 4,
        display: 'inline-block',
      }}>{person.role}</div>}
      {person.focus && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 6 }}>{person.focus}</div>}

    </div>
  );
}

function ManagementCard({ person }) {
  return (
    <div style={{
      padding: '0.75rem 1rem',
      background: 'var(--bg-tertiary)',
      borderRadius: 8,
      border: '1px solid var(--border-primary)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
    }}>
      <Building2 size={16} style={{ color: 'var(--accent-gold)', marginTop: 2, flexShrink: 0 }} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{person.name}</span>
          {person.handle && (
            <a href={person.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: '0.75rem' }}>
              {person.handle}
            </a>
          )}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: 2 }}>{person.title}</div>
        {person.notes && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{person.notes}</div>}
      </div>
    </div>
  );
}

export default function CommunityLinks({ data }) {
  const links = data.links;
  if (!links) return null;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 className="section-title">
        <Users size={20} /> Links, Community & Key People
      </h2>

      {/* Official Links */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Building2 size={14} /> Official
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {links.official?.map((l, i) => (
          <LinkCard key={i} name={l.name} url={l.url} icon={l.icon} />
        ))}
      </div>

      {/* Constellation Trackers */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Radio size={14} /> Constellation Trackers
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {links.trackers?.map((t, i) => (
          <LinkCard key={i} name={t.name} url={t.url} description={t.description} icon="🛰️" />
        ))}
      </div>

      {/* Community */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Users size={14} /> Community
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {links.community?.map((c, i) => (
          <LinkCard key={i} name={c.name} url={c.url} description={c.description} icon={c.platform === 'Reddit' ? '🟠' : '💬'} extra={c.members} />
        ))}
      </div>

      {/* Key Community Analysts */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Star size={14} /> Key Community Analysts
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {links.keyPeople?.map((p, i) => (
          <PersonCard key={i} person={p} />
        ))}
      </div>

      {/* Management */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Building2 size={14} /> Management
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {links.management?.map((m, i) => (
          <ManagementCard key={i} person={m} />
        ))}
      </div>

      {/* GitHub Projects */}
      {links.github?.length > 0 && (
        <>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            <GitFork size={14} /> Open Source Projects
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
            {links.github?.map((g, i) => (
              <LinkCard key={i} name={g.name} url={g.url} description={g.description} icon="⚙️" />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
