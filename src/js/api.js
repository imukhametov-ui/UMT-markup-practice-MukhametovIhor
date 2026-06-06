export async function fetchBouquets({ page = 1, limit = 4 } = {}) {
  const response = await axios.get('./db.json');
  const all = response.data.bouquets;
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length };
}