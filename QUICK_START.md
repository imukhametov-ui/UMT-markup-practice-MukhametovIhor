# 🚀 Quick Start Guide - Flora Application

## 3-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start API Server
```bash
npm run api
```
This launches JSON Server on `http://localhost:3001`

### 3. Open Application
- Open `index.html` in your browser, or
- Use VS Code Live Server extension

## 🎯 What You Can Do

### Filter & Search
- **Price Range**: Drag the slider to filter by price ($0-$100)
- **Search**: Type product name in search box
- **Sort**: Choose from Name (A-Z/Z-A) or Price (Low-High/High-Low)
- **Reset**: Click "Reset Filters" to clear all

### Browse & Order
1. Click any product card to view details
2. Click "Buy now" to open order form
3. Fill in your details (name & phone required)
4. Accept privacy policy
5. Submit order

### Navigate
- Use pagination dots to jump between pages
- Click "Show More" to load next page
- Smooth scroll through sections

## 📊 Project Structure

```
├── index.html                 # Main page
├── db.json                    # Product data
├── package.json              # Dependencies
├── src/
│   ├── css/
│   │   ├── style.css        # All styles including filters
│   │   ├── reset.css
│   │   ├── colors.css
│   │   └── fonts.css
│   ├── js/
│   │   ├── api.js           # API & filtering logic
│   │   ├── catalog.js       # Product listing
│   │   ├── modal.js         # Order forms
│   │   ├── burger.js        # Mobile menu
│   │   ├── slider.js        # Carousels
│   │   └── feedback.js      # Reviews slider
│   ├── images/              # Product images (@1x, @2x)
│   ├── fonts/
│   ├── icons/
│   └── svg-sprite.svg       # Icons sprite
└── INTERACTIVE_FEATURES.md   # Full documentation
```

## 🔧 Key Features

✅ **Responsive Retina Graphics**  
✅ **Real-time Filtering by Price**  
✅ **Full-Text Search**  
✅ **Smart Sorting**  
✅ **Page-based Pagination**  
✅ **Interactive Product Modal**  
✅ **Order Form with Validation**  
✅ **Loading States**  
✅ **Smooth Animations**  
✅ **Mobile-Optimized**  

## 📞 Common Commands

```bash
# Start API server
npm run api

# Format code
npm run format

# Generate image sprite
npm run sprite
```

## 🎨 Customization Tips

### Change Default Page Size
Edit `catalog.js`:
```javascript
const pageSize = 4; // Change to 6, 8, etc.
```

### Change Price Range
Edit `index.html`:
```html
<input type="range" id="priceRange" max="150" value="150" />
```

### Change Colors
Edit `src/css/colors.css` variables

## ⚡ Performance Notes

- Images use lazy loading
- API calls are cached
- Smooth 60fps animations
- Optimized for mobile devices
- Works offline (uses local db.json as fallback)

## 🔗 API Fallback

If API server isn't running:
- Application automatically uses local `db.json`
- All filtering/sorting still works
- Perfect for development without server

## 📱 Responsive Breakpoints

- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1199px  
- **Desktop**: 1200px+

## 🐛 Quick Troubleshooting

**Products not showing?**
- Check browser console (F12)
- Ensure `db.json` exists
- Try `npm install` again

**Filters not working?**
- Refresh page (Ctrl+Shift+R)
- Check `catalog.js` is loaded
- Clear browser cache

**Styles look wrong?**
- Hard refresh (Ctrl+Shift+R)
- Check all CSS files linked in HTML

## 📖 Full Documentation

See `INTERACTIVE_FEATURES.md` for comprehensive guide including:
- Advanced API integration
- Backend connection setup
- Production deployment
- Browser compatibility
- Security features

---

**Status**: Ready to use ✅  
**API**: JSON Server on http://localhost:3001  
**Database**: db.json  
**Ready for Backend Integration**: Yes ✅
