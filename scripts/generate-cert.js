const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create .cert directory if it doesn't exist
const certDir = path.join(__dirname, '..', '.cert');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Generate SSL certificate
try {
  execSync(
    'openssl req -x509 -newkey rsa:2048 -keyout .cert/key.pem -out .cert/cert.pem -days 365 -nodes -subj "/CN=localhost"',
    { stdio: 'inherit' }
  );
  console.log('SSL certificates generated successfully!');
} catch (error) {
  console.error('Error generating SSL certificates:', error);
  process.exit(1);
}
