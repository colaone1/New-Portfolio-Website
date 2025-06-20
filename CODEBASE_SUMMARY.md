# Portfolio Website Codebase Summary

## 🏗️ **Project Structure**

### **Core Files**
- `index.html` - Main HTML structure with SEO optimization and accessibility features
- `css/main.css` - Primary stylesheet with component imports
- `js/main.js` - Core JavaScript functionality and initialization
- `manifest.json` - PWA configuration
- `sw.js` - Service worker for offline support

### **CSS Architecture**
```
css/
├── base/           # Reset and typography
├── components/     # Reusable UI components
├── layouts/        # Page layouts and sections
├── themes/         # Theme system (dark/light)
├── utils/          # Utility classes and variables
├── main.css        # Main stylesheet (imports all)
├── print.css       # Print styles
├── high-contrast.css # Accessibility enhancement
└── reduced-motion.css # Accessibility enhancement
```

### **JavaScript Modules**
```
js/
├── main.js         # Core functionality and initialization
├── navigation.js   # Navigation and mobile menu
└── theme.js        # Theme switching and persistence
```

### **Assets**
```
assets/
├── fonts/          # Web fonts
├── icons/          # SVG icons and favicons
└── images/         # Optimized images
```

## 🎯 **Key Components**

### **Accessibility Features**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Reduced motion support
- Skip links and ARIA labels

### **Performance Optimizations**
- Lazy loading with Intersection Observer
- Image optimization with WebP fallbacks
- Service worker for offline support
- Critical CSS inlining
- Resource hints and preloading

### **Theme System**
- Dark/light mode switching
- System theme detection
- Theme persistence
- High contrast mode
- Print optimization

## 🚀 **Development Workflow**

### **Scripts**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run test` - Unit tests
- `npm run test:e2e` - End-to-end tests
- `npm run test:a11y` - Accessibility tests
- `npm run lighthouse` - Performance audit

### **Quality Gates**
- ESLint for code quality
- Prettier for formatting
- Husky for pre-commit hooks
- Playwright for testing
- Lighthouse CI for performance

## 📊 **Performance Targets**
- Lighthouse score: 95+ for all categories
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🔧 **AI-Optimized Tags**
- `// AI-OPTIMIZED:` - AI-friendly code sections
- `// IMPORTANT:` - Critical logic or security checks
- `// TODO:` - Future improvements
- `// SLOW:` - Performance bottlenecks

## 📁 **File Naming Conventions**
- Components: `*.component.css` (e.g., `button.component.css`)
- Layouts: `*.layout.css` (e.g., `header.layout.css`)
- Utilities: `*.utils.css` (e.g., `variables.utils.css`)
- JavaScript: `*.js` (e.g., `navigation.js`)

## 🎨 **Design System**
- CSS Custom Properties for theming
- Consistent spacing scale
- Typography hierarchy
- Color palette with contrast ratios
- Component variants and states

## 🔍 **Quick Reference**

### **Main Entry Points**
- HTML: `index.html` (line 1)
- CSS: `css/main.css` (line 1)
- JS: `js/main.js` (line 1)

### **Key Functions**
- Theme switching: `js/theme.js` (line 1)
- Navigation: `js/navigation.js` (line 1)
- Service worker: `sw.js` (line 1)

### **Critical Paths**
- Critical CSS: `css/main.css`
- Critical JS: `js/main.js`
- Critical HTML: `index.html` (head section)

---

**This summary provides AI assistants with quick access to the most important aspects of the codebase for efficient processing and development.** 