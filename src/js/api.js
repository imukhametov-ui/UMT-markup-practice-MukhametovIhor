import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export async function fetchBouquets({ page = 1, limit = 4 } = {}) {
  const response = await axios.get(`${BASE_URL}/bouquets`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return {
    data: response.data,
    total: Number(response.headers['x-total-count']),
  };
}