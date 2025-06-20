module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Performance
        'categories:performance': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        interactive: ['error', { maxNumericValue: 3500 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],

        // Accessibility
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'color-contrast': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'html-has-lang': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'tap-targets': ['error', { minScore: 1 }],

        // Best Practices
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'uses-text-compression': ['error', { minScore: 1 }],
        'uses-responsive-images': ['error', { minScore: 1 }],
        'uses-rel-preconnect': ['error', { minScore: 1 }],

        // SEO
        'categories:seo': ['error', { minScore: 0.95 }],
        'robots-txt': ['error', { minScore: 1 }],
        canonical: ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
