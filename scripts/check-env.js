#!/usr/bin/env node

/**
 * Environment Variable Checker
 * Validates that all required environment variables are set
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_VARS = [
  'NEXT_PUBLIC_PROJECT_ID',
  'NEXT_PUBLIC_BASE_STORAGE_ADDRESS',
  'NEXT_PUBLIC_NFT_MINTER_ADDRESS',
];

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

console.log('🔍 Checking environment variables...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('📝 Create it by copying .env.example:');
  console.log('   cp .env.example .env.local\n');
  process.exit(1);
}

// Parse .env.local file manually
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

let hasErrors = false;
let hasWarnings = false;

// Check each required variable
REQUIRED_VARS.forEach((varName) => {
  const value = envVars[varName];

  if (!value) {
    console.error(`❌ ${varName} is not set`);
    hasErrors = true;
  } else if (value === ZERO_ADDRESS) {
    console.warn(`⚠️  ${varName} is set to zero address (contract not deployed)`);
    hasWarnings = true;
  } else if (varName.includes('ADDRESS') && !value.startsWith('0x')) {
    console.error(`❌ ${varName} is not a valid address (must start with 0x)`);
    hasErrors = true;
  } else if (varName.includes('ADDRESS') && value.length !== 42) {
    console.error(`❌ ${varName} is not a valid address (must be 42 characters)`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName} is set`);
  }
});

console.log('');

if (hasErrors) {
  console.error('❌ Environment check failed! Fix the errors above.\n');
  process.exit(1);
}

if (hasWarnings) {
  console.warn('⚠️  Environment check passed with warnings.');
  console.warn('   Deploy contracts and update addresses in .env.local\n');
  process.exit(0);
}

console.log('✅ All environment variables are properly configured!\n');
process.exit(0);
