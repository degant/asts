import { ExternalLink, FileText } from 'lucide-react';

export default function Citations({ citations }) {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="card" style={{ borderTop: '2px solid var(--accent)' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FileText size={20} /> References & Citations
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 16 }}>
        Data sourced from official SEC filings, company press releases, and public financial data.
        Each data point is cited with a reference number [N] linking to the source below.
      </p>
      <ol style={{ 
        fontSize: '0.82rem', 
        color: 'var(--text-dim)', 
        lineHeight: 1.8,
        paddingLeft: 24,
        listStyleType: 'decimal',
      }}>
        {citations.map((cite) => (
          <li key={cite.id} id={`cite-${cite.id}`} style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
              [{cite.id}]
            </span>{' '}
            {cite.url ? (
              <a 
                href={cite.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                {cite.source} <ExternalLink size={11} style={{ verticalAlign: 'middle' }} />
              </a>
            ) : (
              <span>{cite.source}</span>
            )}
            {cite.date && (
              <span style={{ color: 'var(--text-dim)', marginLeft: 8 }}>
                (accessed {cite.date})
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
