/**
 * Navigation module for handling mobile menu, smooth scrolling, and active link highlighting
 */

export class Navigation {
  constructor() {
    this.mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    this.mobileMenu = document.querySelector('[data-mobile-menu]');
    this.navLinks = document.querySelectorAll('[data-nav-link]');
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    // Initialize mobile menu
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener('click', () =>
        this.toggleMobileMenu()
      );
    }

    // Initialize smooth scrolling
    this.navLinks.forEach(link => {
      link.addEventListener('click', e => this.handleSmoothScroll(e));
    });

    // Initialize active link highlighting
    this.updateActiveLink();
    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.mobileMenuButton.setAttribute('aria-expanded', this.isMenuOpen);
    this.mobileMenu.classList.toggle('is-open');

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  handleSmoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');

    // Only handle internal links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Close mobile menu if open
        if (this.isMenuOpen) {
          this.toggleMobileMenu();
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update URL without page reload
        history.pushState(null, '', href);
      }
    }
  }

  updateActiveLink() {
    const scrollPosition = window.scrollY;

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const { top, bottom } = targetElement.getBoundingClientRect();
          const offset = 100; // Offset for better UX

          if (top - offset <= 0 && bottom - offset > 0) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          }
        }
      }
    });
  }
}
