// theme.js — Must run in <head> before body renders to prevent FOUC
(function () {
  var theme  = localStorage.getItem('nc-theme')  || 'dark';
  var accent = localStorage.getItem('nc-accent') || 'cyan';
  document.documentElement.setAttribute('data-theme',  theme);
  document.documentElement.setAttribute('data-accent', accent);
})();
