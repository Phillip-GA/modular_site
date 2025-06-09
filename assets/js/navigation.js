/* Milano Labs V6.0 - Navigation Utilities */

window.NavigationUtils = {
  // Current page tracking
  currentPage: 'main',
  
  // Navigation history
  history: ['main'],
  
  // Page loading cache
  pageCache: new Map(),
  
  // Initialize navigation
  init() {
    this.handleHashChange();
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('popstate', this.handlePopState.bind(this));
  },
  
  // Handle hash changes for direct navigation
  handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== this.currentPage) {
      this.navigateTo(hash);
    }
  },
  
  // Handle browser back/forward
  handlePopState(event) {
    if (event.state && event.state.page) {
      this.navigateTo(event.state.page, false);
    }
  },
  
  // Navigate to a specific page
  async navigateTo(pageId, updateHistory = true) {
    if (pageId === this.currentPage) return;
    
    try {
      const pageContent = await this.loadPageContent(pageId);
      
      // Update current page
      this.currentPage = pageId;
      
      // Update browser history
      if (updateHistory) {
        this.addToHistory(pageId);
        window.history.pushState({ page: pageId }, '', `#${pageId}`);
      }
      
      // Update page content
      this.updatePageContent(pageContent);
      
      // Update navigation state
      this.updateNavigation(pageId);
      
      // Trigger custom event
      window.dispatchEvent(new CustomEvent('pageChanged', { 
        detail: { page: pageId } 
      }));
      
    } catch (error) {
      console.error('Navigation error:', error);
      this.showErrorPage(pageId);
    }
  },
  
  // Load page content with caching
  async loadPageContent(pageId) {
    // Check cache first
    if (this.pageCache.has(pageId)) {
      return this.pageCache.get(pageId);
    }
    
    try {
      const response = await fetch(`pages/${pageId}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load page: ${response.status}`);
      }
      
      const content = await response.text();
      
      // Cache the content
      this.pageCache.set(pageId, content);
      
      return content;
    } catch (error) {
      throw new Error(`Could not load page ${pageId}: ${error.message}`);
    }
  },
  
  // Update page content in DOM
  updatePageContent(content) {
    const contentElement = document.getElementById('page-content');
    if (contentElement) {
      // Add transition effect
      contentElement.style.opacity = '0';
      contentElement.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        contentElement.innerHTML = content;
        contentElement.style.opacity = '1';
        contentElement.style.transform = 'translateY(0)';
        
        // Initialize any new components on the page
        this.initializePageComponents();
      }, 150);
    }
  },
  
  // Update navigation active state
  updateNavigation(pageId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item-active').forEach(item => {
      item.classList.remove('nav-item-active');
      item.classList.add('nav-item-inactive');
    });
    
    // Add active class to current nav item
    const currentNavItem = document.querySelector(`[data-page="${pageId}"]`);
    if (currentNavItem) {
      currentNavItem.classList.remove('nav-item-inactive');
      currentNavItem.classList.add('nav-item-active');
    }
  },
  
  // Add page to history
  addToHistory(pageId) {
    if (this.history[this.history.length - 1] !== pageId) {
      this.history.push(pageId);
      
      // Limit history size
      if (this.history.length > 50) {
        this.history = this.history.slice(-25);
      }
    }
  },
  
  // Go back in history
  goBack() {
    if (this.history.length > 1) {
      this.history.pop(); // Remove current page
      const previousPage = this.history[this.history.length - 1];
      this.navigateTo(previousPage);
    }
  },
  
  // Show error page
  showErrorPage(attemptedPage) {
    const errorContent = `
      <div class="text-white text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="text-6xl mb-4">🚫</div>
          <h2 class="text-xl font-medium mb-4">Page Not Found</h2>
          <p class="text-gray-400 mb-6">
            The page "${attemptedPage}" could not be loaded. This might be because:
          </p>
          <ul class="text-sm text-gray-500 mb-8 text-left">
            <li>• The page file doesn't exist in the pages/ directory</li>
            <li>• There's a network connection issue</li>
            <li>• The server is not running properly</li>
          </ul>
          <button 
            onclick="NavigationUtils.navigateTo('main')"
            class="btn-primary py-2 px-4 rounded transition-all focus-ring"
          >
            Go to Main Page
          </button>
        </div>
      </div>
    `;
    
    this.updatePageContent(errorContent);
  },
  
  // Initialize components after page load
  initializePageComponents() {
    // Re-initialize any React components that need mounting
    this.initializeReactComponents();
    
    // Initialize tooltips, modals, etc.
    this.initializeTooltips();
    
    // Initialize custom form handlers
    this.initializeFormHandlers();
  },
  
  // Initialize React components on new pages
  initializeReactComponents() {
    // Look for React component placeholders and render them
    const reactPlaceholders = document.querySelectorAll('[data-react-component]');
    
    reactPlaceholders.forEach(placeholder => {
      const componentName = placeholder.getAttribute('data-react-component');
      const props = placeholder.getAttribute('data-props') 
        ? JSON.parse(placeholder.getAttribute('data-props')) 
        : {};
      
      if (window[componentName]) {
        ReactDOM.render(
          React.createElement(window[componentName], props),
          placeholder
        );
      }
    });
  },
  
  // Initialize tooltips
  initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', this.showTooltip.bind(this));
      trigger.addEventListener('mouseleave', this.hideTooltip.bind(this));
    });
  },
  
  // Show tooltip
  showTooltip(event) {
    const text = event.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    
    tooltip.className = 'fixed bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg z-50 pointer-events-none';
    tooltip.textContent = text;
    tooltip.id = 'active-tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
  },
  
  // Hide tooltip
  hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  },
  
  // Initialize form handlers
  initializeFormHandlers() {
    // Handle form submissions
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    });
    
    // Handle dynamic button actions
    const actionButtons = document.querySelectorAll('[data-action]');
    
    actionButtons.forEach(button => {
      button.addEventListener('click', this.handleButtonAction.bind(this));
    });
  },
  
  // Handle form submissions
  handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const action = form.getAttribute('data-ajax') || form.action;
    const method = form.method || 'POST';
    
    // Show loading state
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="loading-spinner"></div> Processing...';
    }
    
    // Here you would handle the actual form submission
    console.log('Form submission:', { action, method, data: new FormData(form) });
    
    // Reset form after a delay (simulate processing)
    setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Submit';
      }
    }, 2000);
  },
  
  // Handle button actions
  handleButtonAction(event) {
    const button = event.target;
    const action = button.getAttribute('data-action');
    const target = button.getAttribute('data-target');
    
    switch (action) {
      case 'navigate':
        if (target) this.navigateTo(target);
        break;
      case 'toggle':
        if (target) this.toggleElement(target);
        break;
      case 'modal':
        if (target) this.openModal(target);
        break;
      default:
        console.log('Unknown action:', action);
    }
  },
  
  // Toggle element visibility
  toggleElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle('hidden');
    }
  },
  
  // Open modal (basic implementation)
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },
  
  // Close modal
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },
  
  // Preload pages for better performance
  preloadPages(pageIds) {
    pageIds.forEach(async (pageId) => {
      if (!this.pageCache.has(pageId)) {
        try {
          await this.loadPageContent(pageId);
        } catch (error) {
          console.warn(`Failed to preload page ${pageId}:`, error);
        }
      }
    });
  },
  
  // Clear cache
  clearCache() {
    this.pageCache.clear();
  },
  
  // Get current page info
  getCurrentPage() {
    return {
      id: this.currentPage,
      history: [...this.history],
      cacheSize: this.pageCache.size
    };
  }
};

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.NavigationUtils.init();
});

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationUtils;
}