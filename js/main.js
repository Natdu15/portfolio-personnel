document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("darkModeToggle");
  const body = document.body;

  // Appliquer le thème sauvegardé
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
  } else {
    body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  });
});
