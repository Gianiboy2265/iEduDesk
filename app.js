// grab elements
const loginDiv = document.getElementById('login');
const loginForm = loginDiv.querySelector('form');
// assume your main UI is wrapped in a <div id="app"> initially hidden via CSS
const appDiv = document.getElementById('app');

// replace these with your own credentials or pull from a secure source
const VALID_USERNAME = 'absgian';
const VALID_PASSWORD = 'Dasistcool';

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value;

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // hide login, show app
    loginDiv.style.display = 'none';
    appDiv.style.display   = 'block';
    initApp();              // now kick off your main logic
  } else {
    alert('Invalid username or password.');
    loginForm.password.value = '';
    loginForm.password.focus();
  }
});

function initApp() {
  // load tasks, register service worker, restore from localStorage, etc.
  console.log('Welcome!', VALID_USERNAME);
}

// you can register SW here too
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js');
// }