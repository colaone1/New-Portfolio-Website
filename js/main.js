// AI-OPTIMIZED: Main JavaScript file - Core functionality and initialization
import { Navigation } from './navigation.js';
import { Modal } from './components/modal.js';
import { Alert } from './components/alert.js';
import { Loading } from './components/loading.js';
import JustValidate from 'just-validate';

// IMPORTANT: Core initialization - runs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // THEME TOGGLE: Use icon in navbar
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');

  function setThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeIcon) {
      themeIcon.innerHTML = isDark
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    }
  }

  if (themeToggle) {
    setThemeIcon();
    themeToggle.addEventListener('click', () => {
      // Save menu open state
      const wasMenuOpen = window.app?.navigation?.isMenuOpen;
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      setThemeIcon();
      // Restore menu open state if it was open
      if (wasMenuOpen && window.app?.navigation?.mobileMenu && window.app?.navigation?.mobileMenuButton) {
        window.app.navigation.isMenuOpen = true;
        window.app.navigation.mobileMenu.classList.add('active');
        window.app.navigation.mobileMenuButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // AI-OPTIMIZED: Initialize navigation
  const navigation = new Navigation();

  // AI-OPTIMIZED: Initialize secondary components
  const modal = new Modal();
  const alert = new Alert();
  const loading = new Loading();

  // AI-OPTIMIZED: Make components globally available for debugging
  window.app = {
    modal,
    alert,
    loading,
    navigation,
  };

  // AI-OPTIMIZED: Initialize lazy loading for performance
  const lazyLoadInstance = lozad('.lazy', {
    rootMargin: '50px 0px',
    threshold: 0.1,
    loaded: function (el) {
      el.classList.add('loaded');
    },
  });
  lazyLoadInstance.observe();

  // AI-OPTIMIZED: Initialize project filtering with Isotope
  const grid = document.querySelector('.projects__grid');
  if (grid) {
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

  // IMPORTANT: Initialize form validation for user input security
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

          // AI-OPTIMIZED: Show success message
          alert.showFormSuccess();
          form.reset();
        } catch (error) {
          // AI-OPTIMIZED: Show error message
          alert.showNetworkError();
        } finally {
          // AI-OPTIMIZED: Hide loading state
          loading.hideFormLoading(formId);
        }
      } else {
        // AI-OPTIMIZED: Show validation errors
        const errors = validator.getErrors();
        alert.showFormErrors(errors);
      }
    });
  });

  // AI-OPTIMIZED: Initialize project card modals
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const viewButton = card.querySelector('.btn');
    if (viewButton) {
      viewButton.addEventListener('click', e => {
        e.preventDefault();

        // AI-OPTIMIZED: Get project data from card
        const title = card.querySelector('.project-card__title').textContent;
        const description = card.querySelector(
          '.project-card__description'
        ).textContent;
        const image = card.querySelector('.project-card__image').src;
        const tags = Array.from(
          card.querySelectorAll('.project-card__tag')
        ).map(tag => tag.textContent);

        // AI-OPTIMIZED: Create project object
        const project = {
          title,
          description,
          image,
          tags,
          liveUrl: '#',
          githubUrl: '#',
        };

        // AI-OPTIMIZED: Show project modal
        Modal.showProject(project);
      });
    }
  });

  // AI-OPTIMIZED: Initialize animations (respects reduced motion preference)
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

  // AI-OPTIMIZED: Initialize loading states for images
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
});

// TODO: Add error handling for external library dependencies
// TODO: Implement performance monitoring for animations
// TODO: Add accessibility enhancements for form validation
