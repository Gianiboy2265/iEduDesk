document.addEventListener('DOMContentLoaded', () => {
  const loginDiv = document.getElementById('login');
  if (loginDiv) {
    // --- login page logic ---
    const loginForm = loginDiv.querySelector('form');
    const VALID_USERNAME = 'absgian';
    const VALID_PASSWORD = 'Dasistcool';

    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const u = loginForm.username.value.trim();
      const p = loginForm.password.value;
      if (u === VALID_USERNAME && p === VALID_PASSWORD) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid username or password');
        loginForm.password.value = '';
        loginForm.password.focus();
      }
    });

  } else {
    // --- dashboard page logic ---
    // Prevent direct access:
    if (!sessionStorage.getItem('loggedIn')) {
      window.location.href = 'index.html';
      return;
    }
    initApp();
  }
});

function initApp() {
  console.log('🚀 Dashboard loaded');
  // load tasks, register SW, etc.
}

// you can register SW here too
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js');
// }