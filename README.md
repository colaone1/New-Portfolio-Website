# 🚀 Project Quick Start: Performance, SEO, Accessibility, and Responsiveness

This project follows a strict, prioritized workflow to achieve top scores on Lighthouse and deliver a world-class user experience:

- Minify and bundle all CSS/JS (Vite/Webpack)
- Enable text compression (gzip/brotli)
- Inline critical CSS, defer non-critical JS
- Lazy load and optimize images (WebP/AVIF, Squoosh)
- Use responsive images and explicit width/height
- Ensure color contrast, touch targets, and accessible names
- Add meta tags, structured data, and descriptive alt text
- Use fluid layouts, media queries, and test on all devices
- Run automated and manual tests after every change
- Update troubleshooting and documentation regularly

**See [DEVELOPMENT_APPROACH.md](DEVELOPMENT_APPROACH.md) for the full, step-by-step checklist and best practices.**

---

# Portfolio Website

A modern, performant, and AI-optimized portfolio website built with vanilla JavaScript and modern web technologies. Designed for maximum accessibility, performance, and developer efficiency.

## 🚀 **Features**

### **Core Features**

- ✅ Responsive design with mobile-first approach
- ✅ Project filtering system with smooth animations
- ✅ Performance optimized with 95+ Lighthouse scores
- ✅ Modern animations with reduced motion support
- ✅ Accessibility focused (WCAG 2.1 Level AA)
- ✅ Improved theme system: theme toggle, persistent hamburger menu theme, better text contrast, and accessible form backgrounds
- ✅ Contact form background now matches section background in all themes
- ✅ Hamburger menu no longer closes when toggling theme

### **AI-Optimized Features**

- 🤖 AI-friendly code structure and documentation
- 📁 Simplified imports with index files
- 🏷️ Semantic comments and naming conventions
- 📊 Performance monitoring and optimization
- 🔍 Comprehensive documentation for AI assistants

### **Performance Features**

- ⚡ Core Web Vitals optimization
- 🖼️ Image optimization with WebP support
- 📦 Code splitting and lazy loading
- 🎨 Critical CSS inlining
- 🔄 Service worker for offline support

## 🛠️ **Development**

### **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run all tests
npm run test:all
```

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:a11y        # Run accessibility tests
npm run test:all         # Run all tests

# Performance
npm run lighthouse       # Run Lighthouse audit
npm run lighthouse:mobile # Run mobile Lighthouse audit
npm run performance      # Run all performance tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run validate         # Run all validation checks
```

## 🏗️ **Project Structure**

```
portfolio/
├── css/                 # Stylesheets
│   ├── base/           # Reset and typography
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── themes/         # Theme system
│   ├── utils/          # Utilities and variables
│   └── main.css        # Main stylesheet
├── js/                 # JavaScript modules
│   ├── main.js         # Core functionality
│   ├── navigation.js   # Navigation logic
│   ├── theme.js        # Theme management
│   └── index.js        # Module exports
├── assets/             # Static assets
│   ├── fonts/          # Web fonts
│   ├── icons/          # SVG icons
│   └── images/         # Optimized images
├── tests/              # Test files
└── docs/               # Documentation
```

## 🎯 **Performance Targets**

### **Core Web Vitals**

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Lighthouse Scores**

- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### **Bundle Size Budgets**

- **CSS**: < 50kb
- **JavaScript**: < 100kb
- **Images**: < 500kb
- **Fonts**: < 100kb

## 🤖 **AI Assistant Guide**

This project is optimized for AI assistant processing with:

### **Documentation**

- `CODEBASE_SUMMARY.md` - Quick project overview
- `AI_ASSISTANT_GUIDE.md` - Comprehensive AI guide
- `portfolio_rebuild_plan.md` - Development roadmap

### **Code Organization**

- **AI-OPTIMIZED comments** for key sections
- **IMPORTANT tags** for critical logic
- **TODO markers** for future work
- **Consistent naming conventions**

### **Import Simplification**

```javascript
// Instead of complex paths:
import { Navigation } from './js/navigation.js';

// Use simplified imports:
import { Navigation } from './js';
```

## 🎨 **Design System**

### **Theme System**

- Dark/light mode switching
- System theme detection
- High contrast mode
- Print optimization
- Reduced motion support
- Persistent hamburger menu theme and improved theme toggle icon visibility
- Improved text and form background contrast for accessibility
- Contact form background now matches section background in all themes
- Hamburger menu no longer closes when toggling theme

### **Component Library**

- Button variants (primary, secondary, outline)
- Form components with validation
- Project cards with filtering
- Navigation with mobile support
- Modal and alert components

## 🔧 **Tech Stack**

### **Core Technologies**

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **Vite** - Fast build tool and dev server

### **Performance Tools**

- **GSAP** - High-performance animations
- **Isotope** - Project filtering and layout
- **Lozad** - Lazy loading for images
- **Sharp** - Image optimization
- **Lighthouse CI** - Performance monitoring

### **Development Tools**

- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Playwright** - Testing framework
- **Vitest** - Unit testing

## 📊 **Quality Assurance**

### **Testing Strategy**

- **Unit Tests** - Component functionality
- **E2E Tests** - User workflows
- **Accessibility Tests** - WCAG compliance
- **Performance Tests** - Lighthouse audits

### **Code Quality**

- **ESLint** - Code standards
- **Prettier** - Consistent formatting
- **Husky** - Pre-commit validation
- **TypeScript** - Type checking (optional)

## 🚀 **Deployment**

### **Build Process**

1. **Optimize assets** - Images, fonts, CSS, JS
2. **Generate service worker** - Offline support
3. **Create manifest** - PWA configuration
4. **Run tests** - Quality assurance
5. **Lighthouse audit** - Performance validation

### **Deployment Targets**

- **Netlify** - Static hosting
- **Vercel** - Edge deployment
- **GitHub Pages** - Free hosting
- **Custom server** - Full control

## 📈 **Monitoring**

### **Performance Monitoring**

- Real-time Core Web Vitals tracking
- Lighthouse CI integration
- Bundle size monitoring
- Error tracking and reporting

### **Analytics**

- User interaction tracking
- Performance metrics collection
- Accessibility usage statistics
- Error rate monitoring

## 🤝 **Contributing**

### **Development Workflow**

1. **Fork the repository**
2. **Create feature branch**
3. **Make changes with AI-optimized comments**
4. **Run tests and validation**
5. **Submit pull request**

### **Code Standards**

- Follow AI-optimized patterns
- Add comprehensive comments
- Maintain accessibility standards
- Ensure performance targets
- Update documentation

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

---

**This portfolio website demonstrates modern web development best practices with a focus on performance, accessibility, and AI-assisted development efficiency.**

## 🆕 Recent Improvements (2024-07)

- **Service Worker**: Enhanced with robust error handling, AI-optimized comments, and improved offline support (now always caches `/offline.html`).
- **CSS Performance**: `css/main.css` now prioritizes critical CSS imports, includes accessibility/performance comments, and robust theme variable fallbacks.
- **JavaScript Robustness**: Main JS files now feature strong error handling and troubleshooting comments for easier debugging.
- **Linting**: ESLint config must be named `eslint.config.cjs` (not `.js`) due to `type: module` in `package.json`.

---

## Dark/Light Mode

This project uses a minimal, robust dark/light mode system:
- Toggle button in the top right switches between light and dark themes
- All backgrounds and text use CSS variables: --color-bg and --color-text
- To add new components, always use these variables for color and background

### Troubleshooting
- If the theme toggle does not work, check for JavaScript errors in the console
- If some text or backgrounds do not update, ensure they use the correct variables
- See TROUBLESHOOTING_GUIDE.md for more details

---

**See [FRONTEND_TROUBLESHOOTING.md](FRONTEND_TROUBLESHOOTING.md) for details on recent fixes and accessibility improvements.**
