// AI-OPTIMIZED: Loading component - Loading states and indicators
export class Loading {
  constructor(options = {}) {
    // IMPORTANT: Default configuration
    this.options = {
      duration: 2000,
      showSpinner: true,
      showText: true,
      ...options
    };
    
    this.loadingStates = new Map();
    this.overlay = null;
  }
  
  // IMPORTANT: Show loading overlay
  showOverlay(text = 'Loading...', options = {}) {
    const config = { ...this.options, ...options };
    
    // AI-OPTIMIZED: Create overlay if it doesn't exist
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'loading-overlay';
      this.overlay.setAttribute('role', 'status');
      this.overlay.setAttribute('aria-live', 'polite');
      document.body.appendChild(this.overlay);
    }
    
    // AI-OPTIMIZED: Update overlay content
    this.overlay.innerHTML = `
      <div class="loading-overlay__content">
        ${config.showSpinner ? '<div class="loading-overlay__spinner"><div class="spinner spinner--xl"></div></div>' : ''}
        ${config.showText ? `<p class="loading-overlay__text">${text}</p>` : ''}
      </div>
    `;
    
    // AI-OPTIMIZED: Show overlay
    this.overlay.classList.add('is-active');
    
    // AI-OPTIMIZED: Announce to screen readers
    this.announce(text);
    
    // AI-OPTIMIZED: Dispatch custom event
    this.overlay.dispatchEvent(new CustomEvent('loading:overlay:shown', { detail: { text, options: config } }));
    
    return this.overlay;
  }
  
  // AI-OPTIMIZED: Hide loading overlay
  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.remove('is-active');
      
      // AI-OPTIMIZED: Dispatch custom event
      this.overlay.dispatchEvent(new CustomEvent('loading:overlay:hidden'));
    }
  }
  
  // AI-OPTIMIZED: Show loading state for element
  showElement(element, options = {}) {
    const config = { ...this.options, ...options };
    const elementId = element.id || `element-${Date.now()}`;
    
    // AI-OPTIMIZED: Store original content
    const originalContent = element.innerHTML;
    const originalClasses = element.className;
    
    // AI-OPTIMIZED: Add loading state
    element.classList.add('is-loading');
    
    // AI-OPTIMIZED: Create skeleton content
    const skeletonContent = this.createSkeletonContent(element, config);
    element.innerHTML = skeletonContent;
    
    // AI-OPTIMIZED: Store loading state
    this.loadingStates.set(elementId, {
      element,
      originalContent,
      originalClasses,
      config
    });
    
    // AI-OPTIMIZED: Dispatch custom event
    element.dispatchEvent(new CustomEvent('loading:element:shown', { detail: { element, options: config } }));
    
    return elementId;
  }
  
  // AI-OPTIMIZED: Hide loading state for element
  hideElement(elementId) {
    const loadingState = this.loadingStates.get(elementId);
    
    if (loadingState) {
      const { element, originalContent, originalClasses } = loadingState;
      
      // AI-OPTIMIZED: Restore original content
      element.innerHTML = originalContent;
      element.className = originalClasses;
      
      // AI-OPTIMIZED: Remove loading state
      this.loadingStates.delete(elementId);
      
      // AI-OPTIMIZED: Dispatch custom event
      element.dispatchEvent(new CustomEvent('loading:element:hidden', { detail: { element } }));
    }
  }
  
  // AI-OPTIMIZED: Create skeleton content based on element type
  createSkeletonContent(element, config) {
    const tagName = element.tagName.toLowerCase();
    const classes = element.className;
    
    // AI-OPTIMIZED: Determine skeleton type based on element
    if (classes.includes('project-card')) {
      return this.createProjectCardSkeleton();
    } else if (classes.includes('btn')) {
      return this.createButtonSkeleton();
    } else if (tagName === 'img') {
      return this.createImageSkeleton();
    } else if (tagName === 'table') {
      return this.createTableSkeleton();
    } else {
      return this.createGenericSkeleton();
    }
  }
  
  // AI-OPTIMIZED: Create project card skeleton
  createProjectCardSkeleton() {
    return `
      <div class="skeleton skeleton--image"></div>
      <div class="skeleton skeleton--text skeleton--text--short"></div>
      <div class="skeleton skeleton--text skeleton--text--medium"></div>
      <div class="skeleton skeleton--button"></div>
    `;
  }
  
  // AI-OPTIMIZED: Create button skeleton
  createButtonSkeleton() {
    return `<div class="skeleton skeleton--button"></div>`;
  }
  
  // AI-OPTIMIZED: Create image skeleton
  createImageSkeleton() {
    return `<div class="skeleton skeleton--image"></div>`;
  }
  
  // AI-OPTIMIZED: Create table skeleton
  createTableSkeleton() {
    return `
      <div class="skeleton skeleton--text skeleton--text--long"></div>
      <div class="skeleton skeleton--text skeleton--text--medium"></div>
      <div class="skeleton skeleton--text skeleton--text--long"></div>
      <div class="skeleton skeleton--text skeleton--text--medium"></div>
    `;
  }
  
  // AI-OPTIMIZED: Create generic skeleton
  createGenericSkeleton() {
    return `
      <div class="skeleton skeleton--text skeleton--text--short"></div>
      <div class="skeleton skeleton--text skeleton--text--medium"></div>
      <div class="skeleton skeleton--text skeleton--text--long"></div>
    `;
  }
  
  // AI-OPTIMIZED: Show loading state for button
  showButtonLoading(button, text = 'Loading...') {
    const originalText = button.textContent;
    const originalDisabled = button.disabled;
    
    // AI-OPTIMIZED: Add loading state
    button.classList.add('btn--loading');
    button.disabled = true;
    button.textContent = text;
    
    // AI-OPTIMIZED: Store original state
    const buttonId = button.id || `button-${Date.now()}`;
    this.loadingStates.set(buttonId, {
      element: button,
      originalText,
      originalDisabled,
      type: 'button'
    });
    
    return buttonId;
  }
  
  // AI-OPTIMIZED: Hide loading state for button
  hideButtonLoading(buttonId) {
    const loadingState = this.loadingStates.get(buttonId);
    
    if (loadingState && loadingState.type === 'button') {
      const { element, originalText, originalDisabled } = loadingState;
      
      // AI-OPTIMIZED: Restore original state
      element.classList.remove('btn--loading');
      element.disabled = originalDisabled;
      element.textContent = originalText;
      
      // AI-OPTIMIZED: Remove loading state
      this.loadingStates.delete(buttonId);
    }
  }
  
  // AI-OPTIMIZED: Show loading state for form
  showFormLoading(form, options = {}) {
    const config = { ...this.options, ...options };
    
    // AI-OPTIMIZED: Add loading state
    form.classList.add('form--loading');
    
    // AI-OPTIMIZED: Create spinner
    if (config.showSpinner) {
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      spinner.setAttribute('aria-hidden', 'true');
      form.appendChild(spinner);
    }
    
    // AI-OPTIMIZED: Disable form inputs
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = true;
    });
    
    // AI-OPTIMIZED: Store form state
    const formId = form.id || `form-${Date.now()}`;
    this.loadingStates.set(formId, {
      element: form,
      type: 'form',
      inputs: Array.from(inputs)
    });
    
    return formId;
  }
  
  // AI-OPTIMIZED: Hide loading state for form
  hideFormLoading(formId) {
    const loadingState = this.loadingStates.get(formId);
    
    if (loadingState && loadingState.type === 'form') {
      const { element, inputs } = loadingState;
      
      // AI-OPTIMIZED: Remove loading state
      element.classList.remove('form--loading');
      
      // AI-OPTIMIZED: Remove spinner
      const spinner = element.querySelector('.spinner');
      if (spinner) {
        spinner.remove();
      }
      
      // AI-OPTIMIZED: Re-enable form inputs
      inputs.forEach(input => {
        input.disabled = false;
      });
      
      // AI-OPTIMIZED: Remove loading state
      this.loadingStates.delete(formId);
    }
  }
  
  // AI-OPTIMIZED: Create progress bar
  createProgressBar(container, options = {}) {
    const config = {
      value: 0,
      max: 100,
      animated: true,
      ...options
    };
    
    const progress = document.createElement('div');
    progress.className = 'progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = `progress__bar ${config.animated ? 'progress__bar--animated' : ''}`;
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuenow', config.value);
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', config.max);
    progressBar.style.width = `${(config.value / config.max) * 100}%`;
    
    progress.appendChild(progressBar);
    container.appendChild(progress);
    
    return {
      element: progress,
      bar: progressBar,
      update: (value) => this.updateProgress(progressBar, value, config.max),
      destroy: () => progress.remove()
    };
  }
  
  // AI-OPTIMIZED: Update progress bar
  updateProgress(progressBar, value, max) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', value);
  }
  
  // AI-OPTIMIZED: Create spinner
  createSpinner(container, size = 'medium', options = {}) {
    const config = { ...this.options, ...options };
    
    const spinner = document.createElement('div');
    spinner.className = `spinner spinner--${size}`;
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Loading');
    
    if (config.showText) {
      const text = document.createElement('span');
      text.className = 'sr-only';
      text.textContent = 'Loading...';
      spinner.appendChild(text);
    }
    
    container.appendChild(spinner);
    
    return {
      element: spinner,
      destroy: () => spinner.remove()
    };
  }
  
  // AI-OPTIMIZED: Create dots spinner
  createDotsSpinner(container, options = {}) {
    const config = { ...this.options, ...options };
    
    const dotsSpinner = document.createElement('div');
    dotsSpinner.className = 'spinner-dots';
    dotsSpinner.setAttribute('role', 'status');
    dotsSpinner.setAttribute('aria-label', 'Loading');
    
    // AI-OPTIMIZED: Create dots
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'spinner-dots__dot';
      dotsSpinner.appendChild(dot);
    }
    
    if (config.showText) {
      const text = document.createElement('span');
      text.className = 'sr-only';
      text.textContent = 'Loading...';
      dotsSpinner.appendChild(text);
    }
    
    container.appendChild(dotsSpinner);
    
    return {
      element: dotsSpinner,
      destroy: () => dotsSpinner.remove()
    };
  }
  
  // AI-OPTIMIZED: Announce to screen readers
  announce(message) {
    const announcement = document.createElement('div');
    announcement.className = 'loading-announcement';
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // AI-OPTIMIZED: Remove announcement after screen reader processes it
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }
  
  // AI-OPTIMIZED: Hide all loading states
  hideAll() {
    this.hideOverlay();
    this.loadingStates.forEach((state, id) => {
      if (state.type === 'button') {
        this.hideButtonLoading(id);
      } else if (state.type === 'form') {
        this.hideFormLoading(id);
      } else {
        this.hideElement(id);
      }
    });
  }
  
  // AI-OPTIMIZED: Check if any loading state is active
  isLoading() {
    return this.loadingStates.size > 0 || (this.overlay && this.overlay.classList.contains('is-active'));
  }
  
  // AI-OPTIMIZED: Get loading state count
  getLoadingCount() {
    return this.loadingStates.size;
  }
} 