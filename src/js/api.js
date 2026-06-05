export async function fetchBouquets({ page = 1, limit = 4 } = {}) {
  const response = await fetch('./db.json');
  const json = await response.json();
  const all = json.bouquets;
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length };
}