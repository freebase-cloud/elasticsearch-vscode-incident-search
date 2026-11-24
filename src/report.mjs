export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","message","severity"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.severity==='string' && row.severity.trim()) row.severity=Number(row.severity);
    if (!Number.isFinite(row.severity)) throw new Error('Expected a numeric metric');
  }
  return {critical:rows.filter(r=>r.severity>=4).sort((a,b)=>b.severity-a.severity).map(r=>({message:r.message,severity:r.severity})),lowPriority:rows.filter(r=>r.severity<4).length};
}
