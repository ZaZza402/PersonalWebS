# AxiomWeb - Personal Website & Portfolio

A modern, responsive website built with React featuring a comprehensive code snippets collection, blog system, and portfolio showcase.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, animations, and responsive layouts
- **Code Snippets Gallery**: 8+ comprehensive code examples with live previews
- **Blog System**: Ready for Strapi CMS integration with mock content fallback  
- **Portfolio Showcase**: Interactive project displays with advanced animations
- **SEO Optimized**: Modern routing structure (`/blog`, `/snippets`)
- **Mobile First**: Fully responsive design with touch-friendly interactions
- **Performance**: Optimized images, lazy loading, and efficient animations

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0, React Router 6
- **Styling**: CSS3 with CSS Grid, Flexbox, Custom Properties
- **Animations**: Framer Motion, CSS Animations
- **Icons**: Boxicons
- **CMS Ready**: Strapi integration prepared
- **Deployment Ready**: Vercel/Netlify compatible

## 📦 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ZaZza402/PersonalWebS.git

# Navigate to project directory
cd PersonalWebS

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts

- `npm start` - Runs development server on http://localhost:3000
- `npm run build` - Creates production build in `/build` folder
- `npm test` - Runs test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimatedLogo.js
│   ├── SnippetCard.js
│   ├── SnippetPreviewModal.js
│   └── ...
├── pages/              # Main page components
│   ├── HomePage.js
│   ├── BlogsPage.js    # Blog listing with Strapi integration
│   ├── SnippetsPage.js # Code snippets gallery
│   └── ...
├── services/           # External API services
│   └── strapiAPI.js    # Strapi CMS integration
└── App.js              # Main routing configuration
```

## 🔗 Routing Structure

- `/` - Home page with hero section and services
- `/services` - Services overview
- `/showcase` - Portfolio projects
- `/blog` - Blog articles (integrates with Strapi)
- `/blog/:slug` - Individual article pages
- `/snippets` - Code snippets gallery
- `/contact` - Contact form and information
- `/privacy-policy` - Privacy policy

**Legacy Routes**: `/ai-guides` and `/case-studies` redirect for backwards compatibility.

## 🎨 Code Snippets Collection

The website features 8 comprehensive, production-ready code snippets:

1. **🎨 Animated Card Hover Effect** - Modern CSS animations
2. **⚛️ React useLocalStorage Hook** - Custom React hook with TypeScript
3. **💎 Glassmorphism Card** - Modern glass effect design
4. **✅ JavaScript Form Validator** - Complete validation system
5. **⚡ CSS Loading Spinners** - Collection of 6 animated spinners
6. **🎯 Vue 3 Composition API Counter** - Interactive Vue component
7. **🔧 TypeScript Interface Generator** - JSON to TS interface utility
8. **🎛️ CSS Grid Auto-Layout System** - Responsive grid framework

Each snippet includes:
- Complete HTML, CSS, and JavaScript code
- Mobile-responsive design
- Live preview in sandboxed iframe
- Copy-to-clipboard functionality
- Rating and download metrics

## 🔌 Strapi Integration

The website is prepared for Strapi headless CMS integration:

```javascript
// Example API call (src/services/strapiAPI.js)
const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
const data = await response.json();
```

**Mock Data Fallback**: When Strapi is unavailable, the site shows comprehensive mock content.

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variables for Strapi URL
5. Deploy!

### Custom Domain Setup

Add a `CNAME` file in the `/public` directory:
```
yourdomain.com
```

### Environment Variables

Create `.env` file:
```env
REACT_APP_STRAPI_URL=https://your-strapi-instance.herokuapp.com
REACT_APP_SITE_URL=https://yourdomain.com
```

## 📈 Future Enhancements

- [ ] Set up Strapi CMS backend
- [ ] Add blog commenting system
- [ ] Implement search functionality
- [ ] Add PWA capabilities
- [ ] Performance monitoring integration
- [ ] Multi-language support
- [ ] Advanced analytics integration

## 🔧 Development

### Code Quality

- ESLint configuration included
- Responsive design testing recommended
- Performance audits with Lighthouse

### Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**ZaZza402**
- GitHub: [@ZaZza402](https://github.com/ZaZza402)
- Website: [Coming Soon with Custom Domain]

---

**Built with ❤️ using React and modern web technologies**