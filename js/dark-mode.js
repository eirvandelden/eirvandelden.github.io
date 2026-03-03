// Dark mode toggle functionality
(function() {
  var toggle = document.querySelector('.dark-mode-toggle');
  var html = document.documentElement;

  // Check for saved preference, otherwise use system preference
  var savedTheme = localStorage.getItem('theme');
  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark-mode');
  }

  // Toggle dark mode on button click
  if (toggle) {
    toggle.addEventListener('click', function() {
      html.classList.toggle('dark-mode');
      var isDark = html.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      html.classList.toggle('dark-mode', e.matches);
    }
  });
})();
