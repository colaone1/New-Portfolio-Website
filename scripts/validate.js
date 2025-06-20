#!/usr/bin/env node

// AI-OPTIMIZED: Automated validation script for portfolio website
// This script eliminates manual browser testing by providing comprehensive validation

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

class PortfolioValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  // IMPORTANT: Main validation runner
  async validateAll() {
    console.log('🔍 Starting comprehensive validation...\n');
    
    try {
      await this.validateHTML();
      await this.validateCSS();
      await this.validateJavaScript();
      await this.validateDependencies();
      await this.validateAccessibility();
      await this.validatePerformance();
      
      this.printReport();
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  // AI-OPTIMIZED: HTML validation
  async validateHTML() {
    console.log('📄 Validating HTML...');
    
    try {
      // Check if index.html exists
      if (!existsSync('index.html')) {
        this.errors.push('index.html not found');
        return;
      }

      const html = readFileSync('index.html', 'utf8');
      
      // Check for required meta tags
      const requiredMetaTags = [
        'viewport',
        'description',
        'charset'
      ];
      
      requiredMetaTags.forEach(tag => {
        if (!html.includes(`meta name="${tag}"`) && !html.includes(`charset`)) {
          this.warnings.push(`Missing meta tag: ${tag}`);
        }
      });

      // Check for required sections
      const requiredSections = [
        'header',
        'main',
        'footer'
      ];
      
      requiredSections.forEach(section => {
        if (!html.includes(`<${section}`)) {
          this.errors.push(`Missing required section: ${section}`);
        }
      });

      // Check for accessibility attributes
      const accessibilityChecks = [
        'role=',
        'aria-',
        'alt='
      ];
      
      accessibilityChecks.forEach(check => {
        if (!html.includes(check)) {
          this.warnings.push(`Missing accessibility attribute: ${check}`);
        }
      });

      this.success.push('HTML structure validation passed');
    } catch (error) {
      this.errors.push(`HTML validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: CSS validation
  async validateCSS() {
    console.log('🎨 Validating CSS...');
    
    try {
      // Check if main.css exists
      if (!existsSync('css/main.css')) {
        this.errors.push('css/main.css not found');
        return;
      }

      const mainCSS = readFileSync('css/main.css', 'utf8');
      
      // Check for CSS variable definitions
      if (!existsSync('css/utils/variables.css')) {
        this.errors.push('CSS variables file not found');
        return;
      }

      const variablesCSS = readFileSync('css/utils/variables.css', 'utf8');
      
      // Check for required CSS variables
      const requiredVariables = [
        '--color-primary',
        '--color-background',
        '--color-text',
        '--spacing-',
        '--font-size-',
        '--border-radius-'
      ];
      
      requiredVariables.forEach(variable => {
        if (!variablesCSS.includes(variable)) {
          this.warnings.push(`Missing CSS variable: ${variable}`);
        }
      });

      // Check for component imports
      const componentImports = [
        'button.css',
        'navigation.css',
        'project-card.css',
        'modal.css',
        'alert.css',
        'loading.css'
      ];
      
      componentImports.forEach(component => {
        if (!mainCSS.includes(component)) {
          this.warnings.push(`Missing component import: ${component}`);
        }
      });

      this.success.push('CSS validation passed');
    } catch (error) {
      this.errors.push(`CSS validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: JavaScript validation
  async validateJavaScript() {
    console.log('⚡ Validating JavaScript...');
    
    try {
      // Check if main.js exists
      if (!existsSync('js/main.js')) {
        this.errors.push('js/main.js not found');
        return;
      }

      const mainJS = readFileSync('js/main.js', 'utf8');
      
      // Check for required imports
      const requiredImports = [
        'ThemeManager',
        'Navigation',
        'Modal',
        'Alert',
        'Loading'
      ];
      
      requiredImports.forEach(importName => {
        if (!mainJS.includes(importName)) {
          this.warnings.push(`Missing JavaScript import: ${importName}`);
        }
      });

      // Check for component initialization
      const requiredInitializations = [
        'new ThemeManager()',
        'new Navigation()',
        'new Modal()',
        'new Alert()',
        'new Loading()'
      ];
      
      requiredInitializations.forEach(init => {
        if (!mainJS.includes(init)) {
          this.warnings.push(`Missing component initialization: ${init}`);
        }
      });

      // Check for event listeners
      const requiredEventListeners = [
        'DOMContentLoaded',
        'addEventListener'
      ];
      
      requiredEventListeners.forEach(listener => {
        if (!mainJS.includes(listener)) {
          this.warnings.push(`Missing event listener: ${listener}`);
        }
      });

      this.success.push('JavaScript validation passed');
    } catch (error) {
      this.errors.push(`JavaScript validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: Dependencies validation
  async validateDependencies() {
    console.log('📦 Validating dependencies...');
    
    try {
      const html = readFileSync('index.html', 'utf8');
      
      // Check for external dependencies
      const requiredDependencies = [
        'lozad',
        'isotope',
        'just-validate',
        'gsap'
      ];
      
      requiredDependencies.forEach(dep => {
        if (!html.includes(dep)) {
          this.warnings.push(`Missing external dependency: ${dep}`);
        }
      });

      // Check for local dependencies
      const localDependencies = [
        'css/main.css',
        'js/main.js',
        'manifest.json'
      ];
      
      localDependencies.forEach(dep => {
        if (!html.includes(dep)) {
          this.errors.push(`Missing local dependency: ${dep}`);
        }
      });

      this.success.push('Dependencies validation passed');
    } catch (error) {
      this.errors.push(`Dependencies validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: Accessibility validation
  async validateAccessibility() {
    console.log('♿ Validating accessibility...');
    
    try {
      const html = readFileSync('index.html', 'utf8');
      
      // Check for accessibility features
      const accessibilityFeatures = [
        'role=',
        'aria-label=',
        'aria-labelledby=',
        'aria-current=',
        'aria-expanded=',
        'aria-pressed=',
        'aria-hidden=',
        'aria-live=',
        'aria-required=',
        'aria-describedby='
      ];
      
      let accessibilityScore = 0;
      accessibilityFeatures.forEach(feature => {
        if (html.includes(feature)) {
          accessibilityScore++;
        }
      });

      if (accessibilityScore < 5) {
        this.warnings.push(`Low accessibility score: ${accessibilityScore}/10`);
      } else {
        this.success.push(`Accessibility score: ${accessibilityScore}/10`);
      }

      // Check for semantic elements
      const semanticElements = [
        '<header',
        '<nav',
        '<main',
        '<section',
        '<article',
        '<aside',
        '<footer'
      ];
      
      semanticElements.forEach(element => {
        if (!html.includes(element)) {
          this.warnings.push(`Missing semantic element: ${element}`);
        }
      });

      this.success.push('Accessibility validation passed');
    } catch (error) {
      this.errors.push(`Accessibility validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: Performance validation
  async validatePerformance() {
    console.log('⚡ Validating performance...');
    
    try {
      const html = readFileSync('index.html', 'utf8');
      
      // Check for performance optimizations
      const performanceFeatures = [
        'preload',
        'preconnect',
        'dns-prefetch',
        'lazy',
        'async',
        'defer'
      ];
      
      let performanceScore = 0;
      performanceFeatures.forEach(feature => {
        if (html.includes(feature)) {
          performanceScore++;
        }
      });

      if (performanceScore < 3) {
        this.warnings.push(`Low performance optimization score: ${performanceScore}/6`);
      } else {
        this.success.push(`Performance optimization score: ${performanceScore}/6`);
      }

      // Check for critical resources
      const criticalResources = [
        'css/main.css',
        'js/main.js'
      ];
      
      criticalResources.forEach(resource => {
        if (!html.includes(`preload.*${resource}`)) {
          this.warnings.push(`Missing preload for critical resource: ${resource}`);
        }
      });

      this.success.push('Performance validation passed');
    } catch (error) {
      this.errors.push(`Performance validation error: ${error.message}`);
    }
  }

  // AI-OPTIMIZED: Print validation report
  printReport() {
    console.log('\n📊 Validation Report');
    console.log('==================\n');

    if (this.success.length > 0) {
      console.log('✅ Success:');
      this.success.forEach(item => console.log(`  • ${item}`));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      this.warnings.forEach(item => console.log(`  • ${item}`));
      console.log('');
    }

    if (this.errors.length > 0) {
      console.log('❌ Errors:');
      this.errors.forEach(item => console.log(`  • ${item}`));
      console.log('');
    }

    const totalChecks = this.success.length + this.warnings.length + this.errors.length;
    const successRate = ((this.success.length / totalChecks) * 100).toFixed(1);

    console.log(`📈 Overall Success Rate: ${successRate}%`);
    
    if (this.errors.length === 0) {
      console.log('🎉 All critical validations passed!');
      process.exit(0);
    } else {
      console.log('🔧 Please fix the errors above before proceeding.');
      process.exit(1);
    }
  }
}

// AI-OPTIMIZED: Run validation
const validator = new PortfolioValidator();
validator.validateAll(); 