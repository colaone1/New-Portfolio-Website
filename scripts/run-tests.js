#!/usr/bin/env node

import { execSync } from 'child_process';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runTest(command, description) {
  try {
    log(`\n🔄 Running ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} passed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    return false;
  }
}

log('🚀 Starting Automated Tests', 'blue');
log('='.repeat(40), 'blue');

const tests = [
  { command: 'npm run validate:html', description: 'HTML Validation' },
  { command: 'npm run validate:css', description: 'CSS Validation' },
  { command: 'npm run validate:js', description: 'JavaScript Linting' },
  { command: 'npm run format:check', description: 'Code Formatting' },
  { command: 'npm test', description: 'Unit Tests' },
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
  if (runTest(test.command, test.description)) {
    passed++;
  } else {
    failed++;
  }
});

log(
  `\n📊 Results: ${passed} passed, ${failed} failed`,
  failed > 0 ? 'red' : 'green'
);

if (failed > 0) {
  process.exit(1);
}
