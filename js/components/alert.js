// AI-OPTIMIZED: Alert component - User feedback and notifications
export class Alert {
  constructor(options = {}) {
    // IMPORTANT: Default configuration
    this.options = {
      duration: 5000,
      position: 'top-right',
      autoDismiss: true,
      ...options
    };
    
    this.alerts = [];
    this.toastContainer = null;
    
    // AI-OPTIMIZED: Initialize toast container
    this.initToastContainer();
  }
  
  // IMPORTANT: Initialize toast container
  initToastContainer() {
    this.toastContainer = document.querySelector('.toast-container');
    
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = 'toast-container';
      document.body.appendChild(this.toastContainer);
    }
  }
  
  // AI-OPTIMIZED: Show alert message
  show(message, type = 'info', options = {}) {
    const config = { ...this.options, ...options };
    
    const alert = document.createElement('div');
    alert.className = `alert alert--${type}`;
    alert.setAttribute('role', 'alert');
    alert.setAttribute('aria-live', 'polite');
    
    // AI-OPTIMIZED: Get icon for alert type
    const icon = this.getIcon(type);
    
    alert.innerHTML = `
      <svg class="alert__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        ${icon}
      </svg>
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
      <button class="alert__close" aria-label="Close alert" type="button">
        <svg class="alert__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    `;
    
    // AI-OPTIMIZED: Add close functionality
    const closeButton = alert.querySelector('.alert__close');
    closeButton.addEventListener('click', () => this.close(alert));
    
    // AI-OPTIMIZED: Add to page
    const container = document.querySelector('.alert-container') || document.body;
    container.appendChild(alert);
    
    // AI-OPTIMIZED: Auto-dismiss
    if (config.autoDismiss && config.duration > 0) {
      setTimeout(() => this.close(alert), config.duration);
    }
    
    // AI-OPTIMIZED: Store reference
    this.alerts.push(alert);
    
    // AI-OPTIMIZED: Dispatch custom event
    alert.dispatchEvent(new CustomEvent('alert:shown', { detail: { alert, type, message } }));
    
    return alert;
  }
  
  // AI-OPTIMIZED: Show toast notification
  toast(message, type = 'info', options = {}) {
    const config = { ...this.options, ...options };
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    // AI-OPTIMIZED: Get icon for toast type
    const icon = this.getIcon(type);
    
    toast.innerHTML = `
      <svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        ${icon}
      </svg>
      <div class="toast__content">
        <p class="toast__message">${message}</p>
      </div>
      <button class="toast__close" aria-label="Close notification" type="button">
        <svg class="toast__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      ${config.autoDismiss ? '<div class="toast__progress"></div>' : ''}
    `;
    
    // AI-OPTIMIZED: Add close functionality
    const closeButton = toast.querySelector('.toast__close');
    closeButton.addEventListener('click', () => this.closeToast(toast));
    
    // AI-OPTIMIZED: Add to toast container
    this.toastContainer.appendChild(toast);
    
    // AI-OPTIMIZED: Trigger entrance animation
    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });
    
    // AI-OPTIMIZED: Auto-dismiss
    if (config.autoDismiss && config.duration > 0) {
      setTimeout(() => this.closeToast(toast), config.duration);
    }
    
    // AI-OPTIMIZED: Store reference
    this.alerts.push(toast);
    
    // AI-OPTIMIZED: Dispatch custom event
    toast.dispatchEvent(new CustomEvent('toast:shown', { detail: { toast, type, message } }));
    
    return toast;
  }
  
  // AI-OPTIMIZED: Close alert
  close(alert) {
    if (!alert || !alert.parentNode) return;
    
    // AI-OPTIMIZED: Add exit animation for toasts
    if (alert.classList.contains('toast')) {
      alert.classList.add('is-exiting');
      setTimeout(() => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      }, 300);
    } else {
      alert.parentNode.removeChild(alert);
    }
    
    // AI-OPTIMIZED: Remove from alerts array
    const index = this.alerts.indexOf(alert);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
    
    // AI-OPTIMIZED: Dispatch custom event
    alert.dispatchEvent(new CustomEvent('alert:closed', { detail: { alert } }));
  }
  
  // AI-OPTIMIZED: Close toast with animation
  closeToast(toast) {
    this.close(toast);
  }
  
  // AI-OPTIMIZED: Close all alerts
  closeAll() {
    this.alerts.forEach(alert => this.close(alert));
  }
  
  // AI-OPTIMIZED: Get icon for alert type
  getIcon(type) {
    const icons = {
      success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
      error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />',
      warning: '<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />',
      info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
    };
    
    return icons[type] || icons.info;
  }
  
  // AI-OPTIMIZED: Success alert
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }
  
  // AI-OPTIMIZED: Error alert
  error(message, options = {}) {
    return this.show(message, 'error', options);
  }
  
  // AI-OPTIMIZED: Warning alert
  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }
  
  // AI-OPTIMIZED: Info alert
  info(message, options = {}) {
    return this.show(message, 'info', options);
  }
  
  // AI-OPTIMIZED: Success toast
  successToast(message, options = {}) {
    return this.toast(message, 'success', options);
  }
  
  // AI-OPTIMIZED: Error toast
  errorToast(message, options = {}) {
    return this.toast(message, 'error', options);
  }
  
  // AI-OPTIMIZED: Warning toast
  warningToast(message, options = {}) {
    return this.toast(message, 'warning', options);
  }
  
  // AI-OPTIMIZED: Info toast
  infoToast(message, options = {}) {
    return this.toast(message, 'info', options);
  }
  
  // AI-OPTIMIZED: Form validation alerts
  showFormErrors(errors) {
    Object.keys(errors).forEach(field => {
      const error = errors[field];
      this.error(`${field}: ${error}`);
    });
  }
  
  // AI-OPTIMIZED: Form success message
  showFormSuccess(message = 'Form submitted successfully!') {
    this.success(message);
  }
  
  // AI-OPTIMIZED: Network error handling
  showNetworkError() {
    this.error('Network error. Please check your connection and try again.');
  }
  
  // AI-OPTIMIZED: Loading state
  showLoading(message = 'Loading...') {
    return this.info(message, { autoDismiss: false });
  }
  
  // AI-OPTIMIZED: Hide loading
  hideLoading(alert) {
    if (alert) {
      this.close(alert);
    }
  }
} 