import { Navigation } from './navigation.js';
import { ThemeManager } from './theme.js';

// Initialize modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  const navigation = new Navigation();

  // Initialize theme management
  const themeManager = new ThemeManager();

  // Add any global event listeners or initialization logic here
  document.addEventListener('keydown', (e) => {
    // Handle escape key for closing mobile menu
    if (e.key === 'Escape' && navigation.isMenuOpen) {
      navigation.toggleMobileMenu();
    }
  });
}); 