// AI-OPTIMIZED: Main JavaScript file - Core functionality and initialization
import { ThemeManager } from './theme.js';
import { Navigation } from './navigation.js';
import { Modal } from './components/modal.js';
import { Alert } from './components/alert.js';
import { Loading } from './components/loading.js';

// IMPORTANT: Core initialization - runs when DOM is ready
// TROUBLESHOOTING: If you see errors here, check for missing dependencies in index.html or incorrect import paths.
document.addEventListener('DOMContentLoaded', () => {
  // AI-OPTIMIZED: Initialize theme system (single initialization point)
  let themeManager;
  try {
    themeManager = new ThemeManager();
    window.themeManager = themeManager;
  } catch (err) {
    // TROUBLESHOOTING: ThemeManager failed to initialize
    console.error('ThemeManager initialization error:', err);
  }

  // AI-OPTIMIZED: Initialize navigation
  let navigation;
  try {
    navigation = new Navigation();
  } catch (err) {
    // TROUBLESHOOTING: Navigation failed to initialize
    console.error('Navigation initialization error:', err);
  }

  // AI-OPTIMIZED: Initialize secondary components
  let modal, alert, loading;
  try {
    modal = new Modal();
    alert = new Alert();
    loading = new Loading();
  } catch (err) {
    // TROUBLESHOOTING: Modal/Alert/Loading failed to initialize
    console.error('Component initialization error:', err);
  }

  // AI-OPTIMIZED: Make components globally available for debugging
  window.app = {
    modal,
    alert,
    loading,
    theme: themeManager,
    navigation,
  };

  // AI-OPTIMIZED: Initialize lazy loading for performance
  try {
    const lazyLoadInstance = lozad('.lazy', {
      rootMargin: '50px 0px',
      threshold: 0.1,
      loaded: function (el) {
        el.classList.add('loaded');
      },
    });
    lazyLoadInstance.observe();
  } catch (err) {
    // TROUBLESHOOTING: lozad.js not loaded or selector missing
    console.warn('Lazy loading failed:', err);
  }

  // AI-OPTIMIZED: Initialize project filtering with Isotope
  try {
    const grid = document.querySelector('.projects__grid');
    if (grid && typeof Isotope !== 'undefined') {
      const iso = new Isotope(grid, {
        itemSelector: '.project-card',
        layoutMode: 'fitRows',
        transitionDuration: '0.4s',
      });
      // AI-OPTIMIZED: Filter items on button click
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
  } catch (err) {
    // TROUBLESHOOTING: Isotope not loaded or selector missing
    console.warn('Project filtering failed:', err);
  }

  // IMPORTANT: Initialize form validation for user input security
  try {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const validator = new JustValidate(form, {
        validateBeforeSubmitting: true,
        lockForm: true,
        focusInvalidField: true,
        errorFieldCssClass: 'is-invalid',
        successFieldCssClass: 'is-valid',
      });
      // AI-OPTIMIZED: Add validation rules
      validator
        .addField('[name="name"]', [
          { rule: 'required', errorMessage: 'Name is required' },
          {
            rule: 'minLength',
            value: 2,
            errorMessage: 'Name must be at least 2 characters',
          },
        ])
        .addField('[name="email"]', [
          { rule: 'required', errorMessage: 'Email is required' },
          { rule: 'email', errorMessage: 'Please enter a valid email' },
        ])
        .addField('[name="message"]', [
          { rule: 'required', errorMessage: 'Message is required' },
          {
            rule: 'minLength',
            value: 10,
            errorMessage: 'Message must be at least 10 characters',
          },
        ]);
      // AI-OPTIMIZED: Handle form submission with loading states
      form.addEventListener('submit', async e => {
        e.preventDefault();
        if (validator.isValid) {
          const formId = loading.showFormLoading(form);
          try {
            // AI-OPTIMIZED: Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert.showFormSuccess();
            form.reset();
          } catch (error) {
            // TROUBLESHOOTING: Network or server error
            alert.showNetworkError();
          } finally {
            loading.hideFormLoading(formId);
          }
        } else {
          // AI-OPTIMIZED: Show validation errors
          const errors = validator.getErrors();
          alert.showFormErrors(errors);
        }
      });
    });
  } catch (err) {
    // TROUBLESHOOTING: JustValidate not loaded or selector missing
    console.warn('Form validation failed:', err);
  }

  // AI-OPTIMIZED: Initialize project card modals
  try {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const viewButton = card.querySelector('.btn');
      if (viewButton) {
        viewButton.addEventListener('click', e => {
          e.preventDefault();
          // AI-OPTIMIZED: Get project data from card
          const title = card.querySelector('.project-card__title').textContent;
          const description = card.querySelector('.project-card__description').textContent;
          const image = card.querySelector('.project-card__image').src;
          const tags = Array.from(card.querySelectorAll('.project-card__tag')).map(tag => tag.textContent);
          // AI-OPTIMIZED: Create project object
          const project = { title, description, image, tags, liveUrl: '#', githubUrl: '#' };
          // AI-OPTIMIZED: Show project modal
          Modal.showProject(project);
        });
      }
    });
  } catch (err) {
    // TROUBLESHOOTING: Modal logic failed
    console.warn('Project modal initialization failed:', err);
  }

  // AI-OPTIMIZED: Initialize animations (respects reduced motion preference)
  try {
    if (themeManager && !themeManager.shouldDisableAnimations()) {
      gsap.from('.hero__title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });
      gsap.from('.hero__subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.hero__cta', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4,
      });
    }
  } catch (err) {
    // TROUBLESHOOTING: GSAP not loaded or selector missing
    console.warn('Animation initialization failed:', err);
  }

  // AI-OPTIMIZED: Initialize loading states for images
  try {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.classList.add('image--loading');
      img.addEventListener('load', () => {
        img.classList.remove('image--loading');
      });
      img.addEventListener('error', () => {
        img.classList.remove('image--loading');
        img.src = 'assets/images/placeholder.jpg';
      });
    });
  } catch (err) {
    // TROUBLESHOOTING: Image loading logic failed
    console.warn('Image loading state initialization failed:', err);
  }
});

// TODO: Add error handling for external library dependencies
// TODO: Implement performance monitoring for animations
// TODO: Add accessibility enhancements for form validation
