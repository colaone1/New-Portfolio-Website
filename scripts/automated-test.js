#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`\n${colors.cyan}🔄 ${description}...${colors.reset}`);
    const result = execSync(command, {
      cwd: projectRoot,
      stdio: 'pipe',
      encoding: 'utf8',
    });
    log(
      `${colors.green}✅ ${description} completed successfully${colors.reset}`
    );
    return { success: true, output: result };
  } catch (error) {
    log(`${colors.red}❌ ${description} failed${colors.reset}`);
    log(`${colors.red}Error: ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

function checkDependencies() {
  log(`\n${colors.blue}📦 Checking dependencies...${colors.reset}`);

  const packageJson = JSON.parse(
    readFileSync(join(projectRoot, 'package.json'), 'utf8')
  );
  const requiredDeps = [
    'vitest',
    '@vitest/ui',
    'jsdom',
    '@testing-library/dom',
    '@testing-library/jest-dom',
    'eslint',
    'prettier',
    'stylelint',
    'html-validate',
    '@playwright/test',
  ];

  const missingDeps = requiredDeps.filter(dep => {
    return (
      !packageJson.devDependencies?.[dep] && !packageJson.dependencies?.[dep]
    );
  });

  if (missingDeps.length > 0) {
    log(
      `${colors.yellow}⚠️  Missing dependencies: ${missingDeps.join(', ')}${colors.reset}`
    );
    return false;
  }

  log(
    `${colors.green}✅ All required dependencies are installed${colors.reset}`
  );
  return true;
}

function runValidationTests() {
  log(`\n${colors.magenta}🧪 Running Validation Tests${colors.reset}`);

  const tests = [
    { command: 'npm run validate:html', description: 'HTML Validation' },
    { command: 'npm run validate:css', description: 'CSS Validation' },
    { command: 'npm run validate:js', description: 'JavaScript Linting' },
    { command: 'npm run format:check', description: 'Code Formatting Check' },
    { command: 'npm test', description: 'Unit Tests' },
  ];

  let allPassed = true;

  tests.forEach(test => {
    const result = runCommand(test.command, test.description);
    if (!result.success) {
      allPassed = false;
    }
  });

  return allPassed;
}

function runAccessibilityTests() {
  log(`\n${colors.magenta}♿ Running Accessibility Tests${colors.reset}`);

  // Check if Playwright is available
  if (!existsSync(join(projectRoot, 'node_modules', '.bin', 'playwright'))) {
    log(
      `${colors.yellow}⚠️  Playwright not installed. Installing...${colors.reset}`
    );
    runCommand('npx playwright install', 'Installing Playwright browsers');
  }

  const result = runCommand('npm run test:a11y', 'Accessibility Tests');
  return result.success;
}

function runPerformanceTests() {
  log(`\n${colors.magenta}⚡ Running Performance Tests${colors.reset}`);

  // Start dev server in background
  log(`${colors.cyan}🚀 Starting development server...${colors.reset}`);
  const serverProcess = execSync('npm run dev', {
    cwd: projectRoot,
    stdio: 'pipe',
    detached: true,
  });

  // Wait for server to start
  setTimeout(() => {
    const result = runCommand(
      'npm run lighthouse:ci',
      'Lighthouse Performance Tests'
    );
    return result.success;
  }, 5000);
}

function generateReport(results) {
  log(`\n${colors.bright}📊 Test Results Summary${colors.reset}`);
  log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed
      ? `${colors.green}✅ PASS${colors.reset}`
      : `${colors.red}❌ FAIL${colors.reset}`;
    log(`${test}: ${status}`);
  });

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  const failedTests = totalTests - passedTests;

  log(
    `\n${colors.bright}Summary: ${passedTests}/${totalTests} tests passed${colors.reset}`
  );

  if (failedTests > 0) {
    log(
      `${colors.red}${failedTests} test(s) failed. Please check the output above.${colors.reset}`
    );
    process.exit(1);
  } else {
    log(
      `${colors.green}🎉 All tests passed! Your portfolio is ready for deployment.${colors.reset}`
    );
  }
}

async function main() {
  log(`${colors.bright}🚀 Starting Automated Portfolio Testing${colors.reset}`);
  log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);

  const results = {};

  // Check dependencies
  results.dependencies = checkDependencies();

  if (!results.dependencies) {
    log(
      `${colors.red}❌ Dependency check failed. Please install missing dependencies.${colors.reset}`
    );
    process.exit(1);
  }

  // Run validation tests
  results.validation = runValidationTests();

  // Run accessibility tests
  results.accessibility = runAccessibilityTests();

  // Run performance tests (optional)
  if (process.argv.includes('--performance')) {
    results.performance = runPerformanceTests();
  }

  // Generate report
  generateReport(results);
}

// Handle errors
process.on('unhandledRejection', (reason, promise) => {
  log(
    `${colors.red}❌ Unhandled Rejection at: ${promise}, reason: ${reason}${colors.reset}`
  );
  process.exit(1);
});

process.on('uncaughtException', error => {
  log(`${colors.red}❌ Uncaught Exception: ${error.message}${colors.reset}`);
  process.exit(1);
});

main().catch(error => {
  log(`${colors.red}❌ Test runner failed: ${error.message}${colors.reset}`);
  process.exit(1);
});
