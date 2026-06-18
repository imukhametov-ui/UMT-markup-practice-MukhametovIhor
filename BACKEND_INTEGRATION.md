# 🔌 Backend Integration Guide

This guide explains how to connect Flora to your own backend API.

---

## 📝 Prerequisites

Your backend should provide:
- REST API endpoints for product data
- Same data structure as Flora's db.json
- CORS headers (if on different domain)
- Error handling for invalid requests

---

## 🔧 Integration Steps

### Step 1: Update API URL

Edit `src/js/api.js` and change the API_URL:

```javascript
// BEFORE
const API_URL = 'http://localhost:3001';

// AFTER (Your Backend)
const API_URL = 'https://your-api.com/api'; // Your backend URL
```

### Step 2: Ensure Data Structure Match

Your backend should return data in this format:

```javascript
// GET /api/products (or /bouquets)
[
  {
    id: 1,
    name: "Berry Bloom",
    price: 32,
    img: "https://cdn.example.com/berry-bloom@1x.webp",
    desc: "Product description..."
  },
  // ... more products
]
```

### Step 3: Update Endpoints (if different)

If your endpoints differ, update in `src/js/api.js`:

```javascript
// Example: If your endpoint is /products instead of /bouquets
const response = await axios.get(`${API_URL}/products`);

// Example: With query parameters
const response = await axios.get(`${API_URL}/products`, {
  params: {
    page: page,
    limit: limit,
    sort: sortBy,
    order: sortOrder,
    maxPrice: maxPrice,
    search: search
  }
});
```

---

## 📦 Expected API Endpoints

### Minimum Required

```
GET /api/products (or /bouquets)
Response: Array of product objects
```

### Recommended Additional Endpoints

```
GET /api/products/:id           # Get single product
POST /api/orders                # Create order
GET /api/orders/:id             # Get order details
PUT /api/products/:id           # Update product (admin)
DELETE /api/products/:id        # Delete product (admin)
```

---

## 🔄 Complete API Integration Example

Here's a complete example for a custom backend:

```javascript
// src/js/api.js - Complete example

const API_URL = 'https://your-api.com/api';
const API_KEY = 'your-api-key'; // If needed

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
    // Build query params based on your backend
    const params = new URLSearchParams({
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
      max_price: maxPrice,
      q: search
    });

    // Add auth header if needed
    const headers = {
      'Content-Type': 'application/json'
    };
    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      `${API_URL}/products?${params}`,
      { headers }
    );

    // Adapt response to Flora format if needed
    const data = response.data.items || response.data;
    const total = response.data.total || data.length;
    const pages = Math.ceil(total / limit);

    return { 
      data,
      total,
      page,
      pages
    };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    
    // Fallback to local db.json if available
    try {
      const response = await axios.get('./db.json');
      const bouquets = response.data.bouquets;
      
      // Apply filters locally if backend fails
      const filtered = bouquets.filter(b => b.price <= maxPrice);
      const total = filtered.length;
      const start = (page - 1) * limit;
      const pageData = filtered.slice(start, start + limit);

      return {
        data: pageData,
        total,
        page,
        pages: Math.ceil(total / limit)
      };
    } catch (fallbackError) {
      throw new Error('Unable to fetch products');
    }
  }
}

// Save order to backend
export async function submitOrder(orderData) {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const response = await axios.post(
      `${API_URL}/orders`,
      orderData,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error('Order submission failed:', error);
    // Log to console instead if backend unavailable
    console.log('Order data:', orderData);
    throw error;
  }
}
```

---

## 💾 Saving Orders to Backend

### Current Implementation
Orders are currently logged to console only. To save to backend:

1. Update `src/js/modal.js` form submission:

```javascript
// In modal.js - replace the current form submission

formEl.addEventListener('submit', async e => { 
  e.preventDefault();
  
  const errors = validateForm();
  if (errors.length > 0) {
    alert('Please fill all required fields');
    return;
  }

  // Prepare form data
  const formData = {
    name: formEl.querySelector('input[name="user-name"]').value,
    phone: formEl.querySelector('input[name="user-phone"]').value,
    address: formEl.querySelector('input[name="user-address"]').value,
    message: formEl.querySelector('textarea[name="user-message"]').value,
    product: currentProduct.name,
    quantity: currentProduct.qty,
    price: currentProduct.price,
    timestamp: new Date().toISOString()
  };

  try {
    // Send to backend
    const result = await submitOrder(formData);
    
    // Show success
    const submitBtn = formEl.querySelector('.form-modal__submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Order placed successfully!';
    submitBtn.disabled = true;

    setTimeout(() => {
      closeFormModal();
      formEl.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  } catch (error) {
    alert('Failed to place order. Please try again.');
    console.error('Order error:', error);
  }
});
```

2. Import the function at top of modal.js:

```javascript
import { submitOrder } from './api.js';
```

---

## 🔐 Authentication

If your backend requires authentication:

### Option 1: API Key in Header

```javascript
const headers = {
  'Authorization': `Bearer YOUR_API_KEY`,
  'Content-Type': 'application/json'
};

const response = await axios.get(`${API_URL}/products`, { headers });
```

### Option 2: JWT Token

```javascript
// Store token after login
const token = localStorage.getItem('auth_token');

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

const response = await axios.get(`${API_URL}/products`, { headers });
```

### Option 3: Cookies (CORS enabled)

```javascript
const response = await axios.get(`${API_URL}/products`, {
  withCredentials: true
});
```

---

## ⚠️ CORS Configuration

If your API is on a different domain, ensure CORS is enabled:

### Node.js/Express Backend Example

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://your-flora-domain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Python/Flask Backend Example

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-flora-domain.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

---

## 🧪 Testing Your Integration

### 1. Check Network Requests
1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Reload page
4. Look for API calls to your backend
5. Check response status and data

### 2. Console Logging
Add debug logs to verify data flow:

```javascript
export async function fetchBouquets(filters) {
  console.log('API Request:', { url: API_URL, filters });
  
  try {
    const response = await axios.get(`${API_URL}/products`, { params: filters });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### 3. Mock API Test
Test with a mock API service like [JSONPlaceholder](https://jsonplaceholder.typicode.com/):

```javascript
// Temporary test
const API_URL = 'https://jsonplaceholder.typicode.com';

// This won't return Flora data, but tests API connectivity
const response = await axios.get(`${API_URL}/posts`);
```

---

## 🚀 Deployment Considerations

### Environment Variables

Create `.env` file (not in git):

```env
API_URL=https://your-api.com/api
API_KEY=your-secret-key
ENVIRONMENT=production
```

Load in your build process or use directly if using bundler.

### Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Validate input** - Both client and server side
3. **Use HTTPS only** - Always in production
4. **Implement rate limiting** - Prevent abuse
5. **Add authentication** - Protect sensitive endpoints
6. **Log errors safely** - Don't expose stack traces to users

---

## 📊 Backend Data Format Example

### Product Endpoint Response
```json
[
  {
    "id": 1,
    "name": "Berry Bloom",
    "price": 32,
    "img": "https://cdn.example.com/berry-bloom@1x.webp",
    "desc": "A lush mix of rich pink, purple, and cream blooms..."
  },
  {
    "id": 2,
    "name": "Blush Romance",
    "price": 34,
    "img": "https://cdn.example.com/blush-romance@1x.webp",
    "desc": "A premium bouquet of deep pink and ivory roses..."
  }
]
```

### Order Submission Example
```json
{
  "name": "John Doe",
  "phone": "+1 (555) 123-4567",
  "address": "456 Floral Ave, Sydney NSW 2000 AU",
  "message": "Beautiful flowers for my wedding!",
  "product": "Berry Bloom",
  "quantity": 2,
  "price": "$32",
  "timestamp": "2025-06-18T12:34:56.789Z"
}
```

---

## 🔧 Common Backend Frameworks

### Node.js/Express
```javascript
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
```

### Python/Django
```python
@api_view(['GET'])
def products_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
```

### PHP/Laravel
```php
Route::get('/api/products', function () {
    return Product::all();
});
```

### Java/Spring Boot
```java
@GetMapping("/api/products")
public List<Product> getProducts() {
    return productService.getAllProducts();
}
```

---

## 🆘 Troubleshooting

### "CORS Error" in Console
- Ensure backend has CORS enabled
- Check allowed origins
- Add `Access-Control-Allow-*` headers

### "Cannot read property of undefined"
- Check API response format matches expected structure
- Verify `data`, `total`, `page` fields exist
- Log response to see actual structure

### Products not loading
- Check network tab for API errors (4xx, 5xx)
- Verify API_URL is correct
- Ensure API server is running
- Check for authentication errors

### Orders not saving
- Ensure backend `/api/orders` endpoint exists
- Check order data format
- Verify authentication if required
- Check backend server logs

---

## ✅ Integration Checklist

- [ ] Updated API_URL to your backend
- [ ] Verified data structure matches
- [ ] Tested API endpoints in Postman
- [ ] Enabled CORS on backend
- [ ] Set up authentication if needed
- [ ] Created order submission endpoint
- [ ] Tested filtering and sorting
- [ ] Tested form submission
- [ ] Added error logging
- [ ] Set environment variables
- [ ] Tested in production environment

---

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [REST API Best Practices](https://restfulapi.net/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Postman API Testing](https://www.postman.com/)

---

**Your Flora app is now ready to connect to any backend! 🎉**
