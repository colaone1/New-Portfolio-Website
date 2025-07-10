// Projects Page JavaScript - Advanced filtering and search functionality

export class ProjectsManager {
  constructor() {
    this.grid = null;
    this.iso = null;
    this.activeFilters = new Set();
    this.searchTerm = '';
    this.currentPage = 1;
    this.projectsPerPage = 6;
    this.allProjects = [];
    
    this.init();
  }

  init() {
    this.setupGrid();
    this.setupFilters();
    this.setupSearch();
    this.setupLoadMore();
    this.setupProjectCards();
    this.setupAnimations();
  }

  setupGrid() {
    this.grid = document.getElementById('projects-grid');
    if (!this.grid) return;

    // Initialize Isotope
    this.iso = new Isotope(this.grid, {
      itemSelector: '.project-card',
      layoutMode: 'fitRows',
      transitionDuration: '0.4s',
      stagger: 30,
      initLayout: false
    });

    // Trigger initial layout
    this.iso.layout();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activeFiltersContainer = document.getElementById('active-filters');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        if (filterValue === '*') {
          // Clear all filters
          this.activeFilters.clear();
          this.updateActiveFiltersDisplay();
          this.updateFilterButtons();
          this.filterProjects();
        } else {
          // Toggle filter
          if (this.activeFilters.has(filterValue)) {
            this.activeFilters.delete(filterValue);
          } else {
            this.activeFilters.add(filterValue);
          }
          
          this.updateActiveFiltersDisplay();
          this.updateFilterButtons();
          this.filterProjects();
        }
      });
    });
  }

  updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.getElementById('active-filters');
    if (!activeFiltersContainer) return;

    activeFiltersContainer.innerHTML = '';

    this.activeFilters.forEach(filter => {
      const filterElement = document.createElement('div');
      filterElement.className = 'active-filter';
      filterElement.innerHTML = `
        <span>${this.getFilterDisplayName(filter)}</span>
        <button class="active-filter__remove" data-filter="${filter}" aria-label="Remove filter">
          ×
        </button>
      `;

      // Add remove functionality
      const removeBtn = filterElement.querySelector('.active-filter__remove');
      removeBtn.addEventListener('click', () => {
        this.activeFilters.delete(filter);
        this.updateActiveFiltersDisplay();
        this.updateFilterButtons();
        this.filterProjects();
      });

      activeFiltersContainer.appendChild(filterElement);
    });
  }

  getFilterDisplayName(filter) {
    const displayNames = {
      'web': 'Web Apps',
      'mobile': 'Mobile Apps',
      'ecommerce': 'E-Commerce',
      'api': 'APIs',
      'ui': 'UI/UX',
      'react': 'React',
      'node': 'Node.js',
      'typescript': 'TypeScript',
      'python': 'Python'
    };
    return displayNames[filter] || filter;
  }

  updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      const filterValue = button.getAttribute('data-filter');
      const isActive = filterValue === '*' ? this.activeFilters.size === 0 : this.activeFilters.has(filterValue);
      
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive.toString());
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('project-search');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput) {
      // Debounced search
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.searchTerm = e.target.value.toLowerCase().trim();
          this.filterProjects();
        }, 300);
      });

      // Search button click
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          this.searchTerm = searchInput.value.toLowerCase().trim();
          this.filterProjects();
        });
      }

      // Enter key search
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.searchTerm = searchInput.value.toLowerCase().trim();
          this.filterProjects();
        }
      });
    }
  }

  filterProjects() {
    if (!this.iso) return;

    const filterValue = this.activeFilters.size === 0 ? '*' : 
      Array.from(this.activeFilters).join('');

    // Apply Isotope filter
    this.iso.arrange({
      filter: (item) => {
        const element = item.element;
        const categories = element.getAttribute('data-categories') || '';
        const title = element.querySelector('.project-card__title')?.textContent.toLowerCase() || '';
        const description = element.querySelector('.project-card__description')?.textContent.toLowerCase() || '';
        const tags = Array.from(element.querySelectorAll('.project-card__tag'))
          .map(tag => tag.textContent.toLowerCase());

        // Check category filter
        const categoryMatch = filterValue === '*' || 
          this.activeFilters.size === 0 ||
          Array.from(this.activeFilters).some(filter => 
            categories.includes(filter) || 
            tags.includes(filter.toLowerCase())
          );

        // Check search term
        const searchMatch = !this.searchTerm || 
          title.includes(this.searchTerm) ||
          description.includes(this.searchTerm) ||
          tags.some(tag => tag.includes(this.searchTerm));

        return categoryMatch && searchMatch;
      }
    });

    // Update results count
    this.updateResultsCount();
  }

  updateResultsCount() {
    const visibleItems = this.iso.filteredItems.length;
    const totalItems = this.iso.items.length;
    
    // You can add a results counter element if needed
    const resultsCounter = document.querySelector('.results-counter');
    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${visibleItems} of ${totalItems} projects`;
    }
  }

  setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
      this.loadMoreProjects();
    });
  }

  loadMoreProjects() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    // Add loading state
    loadMoreBtn.classList.add('loading');
    loadMoreBtn.textContent = 'Loading...';

    // Simulate loading more projects
    setTimeout(() => {
      // Add new projects to the grid
      this.addMoreProjects();
      
      // Remove loading state
      loadMoreBtn.classList.remove('loading');
      loadMoreBtn.textContent = 'Load More Projects';
      
      // Re-layout Isotope
      if (this.iso) {
        this.iso.reloadItems();
        this.iso.layout();
      }
    }, 1000);
  }

  addMoreProjects() {
    // This would typically fetch from an API
    // For now, we'll just show a message
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }

  setupProjectCards() {
    // Setup project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const viewBtn = card.querySelector('.project-card__view');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const projectId = viewBtn.getAttribute('data-project');
          this.showProjectDetails(projectId);
        });
      }

      // Add hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  showProjectDetails(projectId) {
    // This would typically open a modal with project details
    // For now, we'll just log the project ID
    console.log(`Showing details for project: ${projectId}`);
    
    // You can implement a modal system here
    // Modal.showProject(projectId);
  }

  setupAnimations() {
    // Animate project cards on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      observer.observe(card);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-item__bar');
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.setProperty('--level', `${level}%`);
        
        const barObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              barObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        barObserver.observe(bar);
      }
    });
  }

  // Utility methods
  getProjectData(projectId) {
    // This would typically fetch from an API or data source
    const projectData = {
      'ecommerce': {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        features: ['User authentication', 'Product catalog', 'Shopping cart', 'Payment processing'],
        liveUrl: 'https://ecommerce-demo.com',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        image: 'assets/images/projects/ecommerce-platform.jpg'
      },
      'task-manager': {
        title: 'Task Manager App',
        description: 'Mobile-first task management application with real-time synchronization and offline support.',
        technologies: ['React Native', 'Firebase', 'Redux', 'PWA'],
        features: ['Task creation', 'Real-time sync', 'Offline support', 'Team collaboration'],
        liveUrl: 'https://task-manager-demo.com',
        githubUrl: 'https://github.com/yourusername/task-manager',
        image: 'assets/images/projects/task-manager.jpg'
      }
      // Add more projects as needed
    };

    return projectData[projectId];
  }

  // Public methods for external use
  refreshGrid() {
    if (this.iso) {
      this.iso.reloadItems();
      this.iso.layout();
    }
  }

  clearFilters() {
    this.activeFilters.clear();
    this.searchTerm = '';
    this.updateActiveFiltersDisplay();
    this.updateFilterButtons();
    this.filterProjects();
  }
}

// Initialize Projects Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on projects page
  if (document.querySelector('.projects-grid')) {
    window.projectsManager = new ProjectsManager();
  }
}); 