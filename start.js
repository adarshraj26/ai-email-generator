const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Email Sender Application...');
console.log('📧 Frontend: http://localhost:3000');
console.log('🔧 Backend: http://localhost:5000');
console.log('');

// Function to start a process
function startProcess(command, args, name, cwd) {
  const process = spawn(command, args, {
    cwd: cwd || process.cwd(),
    stdio: 'inherit',
    shell: true
  });

  process.on('error', (error) => {
    console.error(`❌ Error starting ${name}:`, error.message);
  });

  process.on('exit', (code) => {
    console.log(`⚠️  ${name} process exited with code ${code}`);
  });

  return process;
}

// Start the backend server
console.log('🔧 Starting backend server...');
const backend = startProcess('npm', ['run', 'dev'], 'Backend', path.join(__dirname, 'server'));

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  console.log('🎨 Starting frontend...');
  const frontend = startProcess('npm', ['start'], 'Frontend', path.join(__dirname, 'client'));
}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down application...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down application...');
  process.exit(0);
});

console.log('✅ Application startup initiated!');
console.log('📝 Check the README.md for setup instructions if needed.'); 