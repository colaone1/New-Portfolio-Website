/**
 * Theme management module for handling theme switching, persistence, and system theme detection
 */

export class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('[data-theme-toggle]');
    this.theme = localStorage.getItem('theme') || this.getSystemTheme();
    this.supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.supportsHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.theme);

    // Initialize theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Listen for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.supportsReducedMotion = e.matches;
      document.documentElement.classList.toggle('reduced-motion', e.matches);
    });

    // Listen for high contrast changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      this.supportsHighContrast = e.matches;
      document.documentElement.classList.toggle('high-contrast', e.matches);
    });

    // Set initial accessibility classes
    document.documentElement.classList.toggle('reduced-motion', this.supportsReducedMotion);
    document.documentElement.classList.toggle('high-contrast', this.supportsHighContrast);
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update theme toggle button state
    if (this.themeToggle) {
      this.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      this.themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  // Utility method to check if animations should be disabled
  shouldDisableAnimations() {
    return this.supportsReducedMotion;
  }

  // Utility method to check if high contrast mode is active
  isHighContrast() {
    return this.supportsHighContrast;
  }
} 