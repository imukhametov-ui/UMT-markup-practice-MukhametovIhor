# Flora - Interactive Client Application

## 📋 Overview

The Flora bouquet store has been transformed from a static markup into a **fully-functional interactive web application** with advanced features for filtering, sorting, pagination, and order management.

## ✨ Key Features Implemented

### 1. **Adaptive Graphics for Retina Displays** 🖼️
- All product images use `srcset` with `@1x` and `@2x` variants
- Automatic high-resolution image loading on Retina displays
- Lazy loading support for performance optimization
- Images render crisp on all device pixel ratios

### 2. **Advanced Filtering System** 🔍
- **Price Range Filter**: Smooth slider from $0-$100
- **Search Functionality**: Real-time search across product names and descriptions
- **Filters Reset Button**: One-click reset to default values
- Combined filtering (price + search work together)

### 3. **Smart Sorting** 📊
- Sort by Name (A-Z, Z-A)
- Sort by Price (Low-High, High-Low)
- Sorting applies across all filtered results

### 4. **Dynamic Pagination** 📄
- Page-based pagination (4 items per page by default)
- Visual pagination dots showing current page
- Click pagination dots to jump to specific pages
- Shows item count (e.g., "Items: 4 of 8")
- "Show More" button for infinite scroll behavior

### 5. **Interactive Modals** 🎁
- **Product Modal**: Click any product to view details
  - Product image with Retina support
  - Name, price, and description
  - Quantity selector
  - "Buy now" button

- **Order Form Modal**: Complete checkout experience
  - Name field (required)
  - Phone field (required)
  - Address field (optional)
  - Message field (optional)
  - Privacy policy checkbox (required)
  - Form validation with error messages
  - Success feedback after submission

### 6. **Form Validation** ✅
- Real-time validation on form submission
- Required field checking
- Visual error indicators on invalid inputs
- Clear error messages
- Success state with confirmation message

### 7. **Loading States** ⏳
- Loading spinner during data fetching
- Disabled buttons during loading
- Smooth transitions between states

### 8. **Animations & Transitions** 🎨
- Smooth page transitions
- Fade-in animations for products
- Modal entrance/exit animations
- Hover effects on buttons and cards
- Price range slider smooth interactions

### 9. **API Integration** 🔌
- **Primary**: JSON Server on `http://localhost:3001`
- **Fallback**: Local `db.json` file for offline access
- Full CRUD-ready architecture
- Error handling with graceful fallbacks

### 10. **Responsive Design** 📱
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Filter controls adapt to screen size
- Touch-friendly interface

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the JSON Server (API)**:
   ```bash
   npm run api
   ```
   This will run on `http://localhost:3001` with the data from `db.json`

3. **Open the application**:
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (e.g., Live Server extension in VS Code)

## 📖 Usage Guide

### Filtering Products

1. **Price Range Filter**
   - Drag the slider or click to adjust
   - Updates products in real-time
   - Shows filtered count (e.g., "Items: 4 of 8")

2. **Search**
   - Type in the search box
   - Searches product names and descriptions
   - Works with other filters

3. **Sorting**
   - Select sort option from dropdown
   - Options: Name (A-Z/Z-A), Price (Low-High/High-Low)

4. **Reset Filters**
   - Click "Reset Filters" button
   - Resets all filters to defaults
   - Reloads all products

### Browsing Products

1. **View Products**
   - Products display in grid layout
   - 4 items per page
   - Images lazy-load for performance

2. **Pagination**
   - Click page numbers to jump
   - "Show More" button loads next page
   - Item counter shows progress

3. **View Details**
   - Click any product card
   - Opens product modal with full details
   - Adjust quantity as needed

### Placing an Order

1. **Click "Buy Now"**
   - Opens order form modal
   - Pre-fills product details

2. **Fill Form**
   - **Name** (required)
   - **Phone** (required)
   - **Address** (optional)
   - **Message** (optional)
   - Check privacy policy agreement

3. **Submit**
   - Click "Go to Checkout"
   - Form validates automatically
   - Error messages show if validation fails
   - Success confirmation on completion

## 🔧 Architecture

### JavaScript Modules

- **`api.js`**: API communication with filtering/sorting logic
- **`catalog.js`**: Product listing and pagination management
- **`modal.js`**: Order modals and form handling
- **`burger.js`**: Mobile menu toggle
- **`slider.js`**: Bestsellers carousel
- **`feedback.js`**: Testimonials slider

### CSS Structure

- **`reset.css`**: Base styles reset
- **`colors.css`**: Color variables and themes
- **`fonts.css`**: Font definitions
- **`style.css`**: All component styles (filter, pagination, modals, etc.)

### Data Structure

Products in `db.json`:
```json
{
  "id": 1,
  "name": "Product Name",
  "price": 55,
  "img": "src/images/product@1x.webp",
  "desc": "Product description"
}
```

## 🎯 Advanced Features

### API Endpoints (when using json-server)

```
GET http://localhost:3001/bouquets         - Get all bouquets
GET http://localhost:3001/bouquets/:id     - Get specific bouquet
POST http://localhost:3001/bouquets        - Create new bouquet
PUT http://localhost:3001/bouquets/:id     - Update bouquet
DELETE http://localhost:3001/bouquets/:id  - Delete bouquet
```

### Filter Parameters

The `fetchBouquets()` function supports:
```javascript
{
  page: 1,              // Page number
  limit: 4,             // Items per page
  sortBy: 'name',       // 'name' or 'price'
  sortOrder: 'asc',     // 'asc' or 'desc'
  minPrice: 0,          // Minimum price
  maxPrice: 100,        // Maximum price
  search: ''            // Search term
}
```

## 📱 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- Mobile browsers: Full responsive support

## 🔒 Security Features

- Client-side form validation
- XSS prevention through proper DOM updates
- HTTPS-ready for production
- Privacy policy agreement requirement

## 🎨 Customization

### Modify Colors
Edit `src/css/colors.css` for color scheme changes

### Adjust Grid Layout
Edit `catalogues__filters` grid in `style.css`:
```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

### Change Items Per Page
In `catalog.js`, modify:
```javascript
const pageSize = 4; // Change this value
```

### Update Price Range
In `index.html`, modify the slider:
```html
<input type="range" id="priceRange" min="0" max="150" value="150" />
```

## 🐛 Troubleshooting

### Products not loading
1. Check if `db.json` exists
2. Ensure `node_modules` is installed
3. Check browser console for errors
4. If using API: `npm run api` must be running

### Modals not opening
1. Check if `modal.js` is loaded in HTML
2. Ensure `product-card__btn` class is applied to product buttons
3. Check console for JavaScript errors

### Filtering not working
1. Ensure `catalog.js` is loaded as module (`type="module"`)
2. Check if `api.js` is imported correctly
3. Verify filter input IDs match JavaScript selectors

### Styles not applying
1. Check if `style.css` is linked in HTML
2. Clear browser cache
3. Check browser developer tools for CSS errors

## 📦 Build & Deployment

### For Production

1. **Optimize images**:
   ```bash
   npm run sprite
   ```

2. **Format code**:
   ```bash
   npm run format
   ```

3. **Deploy**:
   - Copy all files to web server
   - Ensure `db.json` is available or connect to backend API
   - Update API URL in `api.js` for production

## 🔗 Backend Integration

To connect to your own backend:

1. Edit `api.js` and change `API_URL`:
```javascript
const API_URL = 'https://your-api.com/api';
```

2. Ensure your backend provides the same data structure
3. Implement endpoints for:
   - GET `/bouquets` - List products
   - POST `/orders` - Create orders (optional enhancement)

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🤝 Contributing

To add new features:

1. Create feature branches
2. Test thoroughly
3. Update this documentation
4. Ensure responsive design works

## 📝 License

This project is part of UMT markup practice.

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Status**: Production Ready ✅
