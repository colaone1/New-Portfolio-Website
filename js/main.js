// Main JavaScript file
import './theme.js';

// Theme System
const themeSystem = {
  init() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
    this.setupListeners();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  },

  setupListeners() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => this.toggleTheme());
    }
  },

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }
};

// Initialize theme system
document.addEventListener('DOMContentLoaded', () => {
  themeSystem.init();

  // Mobile navigation
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navList?.classList.contains('active') && 
        !e.target.closest('.nav__list') && 
        !e.target.closest('.nav__toggle')) {
      navList.classList.remove('active');
      navToggle?.classList.remove('active');
    }
  });
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList?.classList.remove('active');
      navToggle?.classList.remove('active');
    });
  });
}); 