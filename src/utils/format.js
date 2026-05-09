export function formatPrice(n) {
  if (n == null) return 'N/A';
  return '$' + Number(n).toFixed(2);
}

export function formatMarketCap(n) {
  if (n == null) return 'N/A';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M';
  return '$' + n.toLocaleString();
}

export function formatPercent(n) {
  if (n == null) return 'N/A';
  const sign = n >= 0 ? '+' : '';
  return sign + n.toFixed(1) + '%';
}

export function formatMillions(n) {
  if (n == null) return 'N/A';
  return '$' + Math.abs(n).toFixed(1) + 'M';
}

export function formatDate(dateStr) {
  if (!dateStr) return 'TBD';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // fallback for 'Q3 2026' etc
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function statusColor(status) {
  const map = {
    operational: 'var(--status-operational)',
    manifested: 'var(--status-manifested)',
    planned: 'var(--status-planned)',
    lost: 'var(--status-lost)',
    grounded: 'var(--status-grounded)',
    decommissioned: 'var(--status-decommissioned)',
  };
  return map[status] || 'var(--text-muted)';
}

export function riskColor(severity) {
  const map = {
    critical: 'var(--risk-critical)',
    high: 'var(--risk-high)',
    medium: 'var(--risk-medium)',
    low: 'var(--risk-low)',
  };
  return map[severity] || 'var(--text-muted)';
}

export function catalystColor(type) {
  const map = {
    launch: 'var(--catalyst-launch)',
    earnings: 'var(--catalyst-earnings)',
    commercial: 'var(--catalyst-commercial)',
    regulatory: 'var(--catalyst-regulatory)',
    deployment: 'var(--catalyst-deployment)',
    failure: 'var(--catalyst-failure)',
    partnership: 'var(--catalyst-partnership)',
    milestone: 'var(--catalyst-milestone)',
  };
  return map[type] || 'var(--accent-primary)';
}
