const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up AI Email Sender Application...');
console.log('');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`✅ npm version: ${npmVersion.trim()}`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

console.log('');

// Install dependencies
console.log('📦 Installing dependencies...');

try {
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing server dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'server') });
  
  console.log('Installing client dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  
  console.log('✅ All dependencies installed successfully!');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('');

// Check if .env file exists in server directory
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file template...');
  const envExample = path.join(__dirname, 'server', 'env.example');
  
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envPath);
    console.log('✅ .env file created from template');
    console.log('⚠️  Please update the .env file with your actual credentials');
  } else {
    console.log('⚠️  Please create a .env file in the server directory');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('');
console.log('🎉 Setup completed successfully!');
console.log('');
console.log('📋 Next steps:');
console.log('1. Update server/.env with your Groq API key and Gmail credentials');
console.log('2. Run "npm start" to start the application');
console.log('3. Open http://localhost:3000 in your browser');
console.log('');
console.log('📖 For detailed instructions, see README.md'); 