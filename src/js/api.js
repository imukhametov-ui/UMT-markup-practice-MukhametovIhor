const API_URL = 'https://flora-backend-v936.onrender.com/api';
export async function fetchBouquets({ 
  page = 1, 
  limit = 4,
  sortBy = 'name',
  sortOrder = 'asc',
  minPrice = 0,
  maxPrice = Infinity,
  search = ''
} = {}) {
  try {
    const response = await axios.get(`${API_URL}/bouquets`);
    let bouquets = response.data;

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      bouquets = bouquets.filter(b => b.price >= minPrice && b.price <= maxPrice);
    }

    // Filter by search term
    if (search) {
      const term = search.toLowerCase();
      bouquets = bouquets.filter(b => 
        b.name.toLowerCase().includes(term) || 
        b.desc.toLowerCase().includes(term)
      );
    }

    // Sort
    bouquets.sort((a, b) => {
      let aVal, bVal;
      
      if (sortBy === 'name') {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (sortBy === 'price') {
        aVal = a.price;
        bVal = b.price;
      } else {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const total = bouquets.length;
    const start = (page - 1) * limit;
    const data = bouquets.slice(start, start + limit);

    return { 
      data, 
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to local db.json if API server is not running
    try {
      const response = await axios.get('./db.json');
      let bouquets = response.data.bouquets;

      // Apply same filters and sorting
      if (minPrice !== undefined || maxPrice !== undefined) {
        bouquets = bouquets.filter(b => b.price >= minPrice && b.price <= maxPrice);
      }

      if (search) {
        const term = search.toLowerCase();
        bouquets = bouquets.filter(b => 
          b.name.toLowerCase().includes(term) || 
          b.desc.toLowerCase().includes(term)
        );
      }

      bouquets.sort((a, b) => {
        let aVal, bVal;
        if (sortBy === 'name') {
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
        } else if (sortBy === 'price') {
          aVal = a.price;
          bVal = b.price;
        } else {
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
        }
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      const total = bouquets.length;
      const start = (page - 1) * limit;
      const data = bouquets.slice(start, start + limit);

      return { 
        data, 
        total,
        page,
        pages: Math.ceil(total / limit)
      };
    } catch (fallbackError) {
      console.error('Fallback Error:', fallbackError);
      throw new Error('Unable to fetch bouquets');
    }
  }
}

export async function saveBouquet(bouquetData) {
  try {
    const response = await axios.post(`${API_URL}/bouquets`, bouquetData);
    return response.data;
  } catch (error) {
    console.error('Save Error:', error);
    throw error;
  }
}
