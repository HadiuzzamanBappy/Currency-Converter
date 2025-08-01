class ThemeManager {
    constructor() {
      this.root = document.documentElement;
      this.initializeTheme();
    }
  
    initializeTheme() {
      if (!this.root.hasAttribute("data-theme")) {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        this.root.setAttribute("data-theme", prefersDark ? "dark" : "light");
      }
  
      document.querySelectorAll('[data-toggle="theme"]').forEach((button) => {
        button.addEventListener("click", () => this.toggleTheme());
      });
  
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!this.root.hasAttribute("data-theme")) {
            this.root.setAttribute("data-theme", e.matches ? "dark" : "light");
          }
        });
    }
  
    toggleTheme() {
      const currentTheme = this.root.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      this.root.setAttribute("data-theme", newTheme);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => new ThemeManager());