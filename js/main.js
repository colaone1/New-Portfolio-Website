// Main JavaScript file
import { ThemeManager } from './theme.js';
import { Navigation } from './navigation.js';

// Initialize core functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme system
  const themeManager = new ThemeManager();
  
  // Initialize navigation
  const navigation = new Navigation();
  
  // Initialize lazy loading
  const lazyLoadInstance = lozad('.lazy', {
    rootMargin: '50px 0px',
    threshold: 0.1,
    loaded: function(el) {
      el.classList.add('loaded');
    }
  });
  lazyLoadInstance.observe();
  
  // Initialize project filtering
  const grid = document.querySelector('.projects__grid');
  if (grid) {
    const iso = new Isotope(grid, {
      itemSelector: '.project-card',
      layoutMode: 'fitRows',
      transitionDuration: '0.4s'
    });
    
    // Filter items on button click
    const filterButtons = document.querySelectorAll('.filter__btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
        
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }
  
  // Initialize form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const validator = new JustValidate(form, {
      validateBeforeSubmitting: true,
      lockForm: true,
      focusInvalidField: true,
      errorFieldCssClass: 'is-invalid',
      successFieldCssClass: 'is-valid'
    });
    
    // Add validation rules
    validator
      .addField('[name="name"]', [
        { rule: 'required', errorMessage: 'Name is required' },
        { rule: 'minLength', value: 2, errorMessage: 'Name must be at least 2 characters' }
      ])
      .addField('[name="email"]', [
        { rule: 'required', errorMessage: 'Email is required' },
        { rule: 'email', errorMessage: 'Please enter a valid email' }
      ])
      .addField('[name="message"]', [
        { rule: 'required', errorMessage: 'Message is required' },
        { rule: 'minLength', value: 10, errorMessage: 'Message must be at least 10 characters' }
      ]);
  });
  
  // Initialize animations
  if (!themeManager.shouldDisableAnimations()) {
    gsap.from('.hero__title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
    
    gsap.from('.hero__subtitle', {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2
    });
    
    gsap.from('.hero__cta', {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.4
    });
  }
}); 