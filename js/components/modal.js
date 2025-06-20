// AI-OPTIMIZED: Modal component - Accessible overlay dialogs
export class Modal {
  constructor(options = {}) {
    // IMPORTANT: Default configuration
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      autoFocus: true,
      ...options
    };
    
    this.modal = null;
    this.backdrop = null;
    this.previousFocus = null;
    this.focusableElements = [];
    this.isOpen = false;
    
    // AI-OPTIMIZED: Bind methods to preserve context
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.close = this.close.bind(this);
  }
  
  // IMPORTANT: Create modal structure
  create(content, title = '') {
    // AI-OPTIMIZED: Create backdrop
    if (this.options.backdrop) {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'modal-backdrop';
      this.backdrop.setAttribute('aria-hidden', 'true');
      this.backdrop.addEventListener('click', this.handleBackdropClick);
    }
    
    // AI-OPTIMIZED: Create modal container
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', title ? 'modal-title' : '');
    
    // AI-OPTIMIZED: Generate unique ID for modal
    const modalId = `modal-${Date.now()}`;
    this.modal.id = modalId;
    
    // AI-OPTIMIZED: Build modal HTML structure
    this.modal.innerHTML = `
      <div class="modal__header">
        ${title ? `<h2 class="modal__title" id="modal-title">${title}</h2>` : ''}
        <button class="modal__close" aria-label="Close modal" type="button">
          <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="modal__body">
        ${content}
      </div>
    `;
    
    // AI-OPTIMIZED: Add event listeners
    const closeButton = this.modal.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);
    
    // AI-OPTIMIZED: Add to DOM
    if (this.backdrop) {
      document.body.appendChild(this.backdrop);
    }
    document.body.appendChild(this.modal);
    
    // AI-OPTIMIZED: Store focusable elements
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    return this;
  }
  
  // IMPORTANT: Open modal with accessibility features
  open() {
    if (this.isOpen) return;
    
    // AI-OPTIMIZED: Store current focus
    this.previousFocus = document.activeElement;
    
    // AI-OPTIMIZED: Show modal and backdrop
    if (this.backdrop) {
      this.backdrop.classList.add('is-active');
    }
    this.modal.classList.add('is-active');
    
    // AI-OPTIMIZED: Set focus to modal
    if (this.options.focus) {
      this.modal.focus();
    }
    
    // AI-OPTIMIZED: Auto-focus first focusable element
    if (this.options.autoFocus && this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
    
    // AI-OPTIMIZED: Add keyboard event listener
    if (this.options.keyboard) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    
    // AI-OPTIMIZED: Trap focus within modal
    this.trapFocus();
    
    // AI-OPTIMIZED: Update state
    this.isOpen = true;
    
    // AI-OPTIMIZED: Announce to screen readers
    this.announce('Modal opened');
    
    // AI-OPTIMIZED: Dispatch custom event
    this.modal.dispatchEvent(new CustomEvent('modal:opened', { detail: { modal: this } }));
    
    return this;
  }
  
  // IMPORTANT: Close modal with cleanup
  close() {
    if (!this.isOpen) return;
    
    // AI-OPTIMIZED: Hide modal and backdrop
    if (this.backdrop) {
      this.backdrop.classList.remove('is-active');
    }
    this.modal.classList.remove('is-active');
    
    // AI-OPTIMIZED: Remove keyboard event listener
    if (this.options.keyboard) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
    
    // AI-OPTIMIZED: Restore focus
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }
    
    // AI-OPTIMIZED: Update state
    this.isOpen = false;
    
    // AI-OPTIMIZED: Announce to screen readers
    this.announce('Modal closed');
    
    // AI-OPTIMIZED: Dispatch custom event
    this.modal.dispatchEvent(new CustomEvent('modal:closed', { detail: { modal: this } }));
    
    // AI-OPTIMIZED: Clean up after animation
    setTimeout(() => {
      this.destroy();
    }, 300);
    
    return this;
  }
  
  // AI-OPTIMIZED: Handle keyboard events
  handleKeydown(event) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.handleTabKey(event);
        break;
    }
  }
  
  // AI-OPTIMIZED: Handle tab key for focus trapping
  handleTabKey(event) {
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  // AI-OPTIMIZED: Handle backdrop click
  handleBackdropClick(event) {
    if (event.target === this.backdrop) {
      this.close();
    }
  }
  
  // AI-OPTIMIZED: Trap focus within modal
  trapFocus() {
    const focusableElements = Array.from(this.focusableElements);
    
    // AI-OPTIMIZED: Ensure at least one element is focusable
    if (focusableElements.length === 0) {
      const closeButton = this.modal.querySelector('.modal__close');
      if (closeButton) {
        closeButton.focus();
      }
      return;
    }
    
    // AI-OPTIMIZED: Focus first element if none focused
    if (!this.modal.contains(document.activeElement)) {
      focusableElements[0].focus();
    }
  }
  
  // AI-OPTIMIZED: Announce to screen readers
  announce(message) {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // AI-OPTIMIZED: Remove announcement after screen reader processes it
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
  
  // AI-OPTIMIZED: Update modal content
  updateContent(content) {
    const body = this.modal.querySelector('.modal__body');
    if (body) {
      body.innerHTML = content;
    }
    
    // AI-OPTIMIZED: Update focusable elements
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    return this;
  }
  
  // AI-OPTIMIZED: Add footer with actions
  addFooter(actions) {
    const footer = document.createElement('div');
    footer.className = 'modal__footer';
    footer.innerHTML = actions;
    
    this.modal.appendChild(footer);
    
    // AI-OPTIMIZED: Update focusable elements
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    return this;
  }
  
  // AI-OPTIMIZED: Set modal size variant
  setSize(size) {
    const sizes = ['small', 'large', 'fullscreen'];
    if (sizes.includes(size)) {
      this.modal.className = `modal modal--${size}`;
    }
    
    return this;
  }
  
  // AI-OPTIMIZED: Clean up modal
  destroy() {
    if (this.backdrop && this.backdrop.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
    }
    
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
    
    this.modal = null;
    this.backdrop = null;
    this.previousFocus = null;
    this.focusableElements = [];
    this.isOpen = false;
  }
  
  // AI-OPTIMIZED: Static method for quick modal creation
  static show(content, title = '', options = {}) {
    const modal = new Modal(options);
    modal.create(content, title).open();
    return modal;
  }
  
  // AI-OPTIMIZED: Static method for project details modal
  static showProject(project) {
    const content = `
      <img src="${project.image}" alt="${project.title}" class="modal__image">
      <div class="modal__tags">
        ${project.tags.map(tag => `<span class="modal__tag">${tag}</span>`).join('')}
      </div>
      <p class="modal__description">${project.description}</p>
      <div class="modal__links">
        <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener">View Live</a>
        <a href="${project.githubUrl}" class="btn btn-outline" target="_blank" rel="noopener">View Code</a>
      </div>
    `;
    
    return Modal.show(content, project.title);
  }
} 