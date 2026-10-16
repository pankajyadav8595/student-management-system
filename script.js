// script.js — small interactions for demo dashboard

// Sidebar toggle for mobile
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
}

const initialTheme = storedTheme || (prefersDark && prefersDark.matches ? 'dark' : 'light');
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

if (!storedTheme && prefersDark) {
  const handleSystemThemeChange = (event) => {
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (prefersDark.addEventListener) {
    prefersDark.addEventListener('change', handleSystemThemeChange);
  } else if (prefersDark.addListener) {
    prefersDark.addListener(handleSystemThemeChange);
  }
}

// Simple counter animation for stat cards
const counters = document.querySelectorAll('.card-value');
counters.forEach(el => {
  const target = +el.getAttribute('data-target') || 0;
  let current = 0;
  const step = Math.ceil(target / 60);
  const id = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (el.getAttribute('data-target') === '92' ? '%' : '');
      clearInterval(id);
    } else {
      el.textContent = current;
    }
  }, 16);
});
