/**
 * Navigation module for handling mobile menu, smooth scrolling, and active link highlighting
 * Based on the original implementation from Sam's Portfolio Website
 */

export class Navigation {
  constructor() {
    // Preserve existing navigation elements
    this.mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.navLinks = document.querySelectorAll('[data-nav-link]');
    this.isMenuOpen = false;
    
    // Initialize navigation
    this.init();
  }

  init() {
    // Initialize mobile menu
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isMenuOpen && 
            !e.target.closest('[data-mobile-menu]') && 
            !e.target.closest('[data-mobile-menu-button]')) {
          this.closeMenu();
        }
      });
    }
    
    // Initialize smooth scrolling
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          this.scrollToSection(href);
          this.closeMenu();
        }
      });
    });
    
    // Initialize active link highlighting
    this.updateActiveLink();
    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.mobileMenuButton.setAttribute('aria-expanded', this.isMenuOpen);
    this.mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.mobileMenuButton.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
} 