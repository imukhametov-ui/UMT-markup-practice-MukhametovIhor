const BASE_URL = 'http://localhost:3001';

export async function fetchBouquets({ page = 1, limit = 4 } = {}) {
  const response = await fetch(
    `${BASE_URL}/bouquets?_page=${page}&_limit=${limit}`
  );
  const total = response.headers.get('x-total-count');
  const data = await response.json();
  return { data, total: Number(total) };
}