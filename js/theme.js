// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.highContrast = window.matchMedia('(prefers-contrast: high)');
    
    this.init();
  }
  
  init() {
    // Set initial theme
    this.setTheme(this.theme);
    
    // Listen for system theme changes
    this.systemTheme.addEventListener('change', (e) => {
      if (this.theme === 'system') {
        this.setTheme('system');
      }
    });
    
    // Listen for high contrast changes
    this.highContrast.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'high-contrast');
      } else if (this.theme === 'high-contrast') {
        this.setTheme('light');
      }
    });
    
    // Initialize theme switcher
    this.initThemeSwitcher();
  }
  
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'system') {
      const systemTheme = this.systemTheme.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', systemTheme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Update active state in theme switcher
    this.updateThemeSwitcher();
  }
  
  initThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (!themeSwitcher) return;
    
    // Toggle dropdown
    themeSwitcher.addEventListener('click', (e) => {
      e.stopPropagation();
      themeSwitcher.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      themeSwitcher.classList.remove('active');
    });
    
    // Handle theme options
    const options = themeSwitcher.querySelectorAll('.theme-switcher__option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.setTheme(theme);
      });
    });
    
    this.updateThemeSwitcher();
  }
  
  updateThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (!themeSwitcher) return;
    
    const options = themeSwitcher.querySelectorAll('.theme-switcher__option');
    options.forEach(option => {
      option.classList.toggle('active', option.dataset.theme === this.theme);
    });
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
}); 