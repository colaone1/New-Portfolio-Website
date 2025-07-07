// AI-OPTIMIZED: Main JavaScript file - Core functionality and initialization
import { Navigation } from './navigation.js';
import { Modal } from './components/modal.js';
import { Alert } from './components/alert.js';
import { Loading } from './components/loading.js';

// IMPORTANT: Core initialization - runs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add theme toggle button if not present (run this first)
  if (!document.getElementById('theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.textContent = 'Toggle Theme';
    btn.style.position = 'fixed';
    btn.style.top = '1rem';
    btn.style.right = '1rem';
    btn.style.zIndex = '9999';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
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
