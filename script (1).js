/* ==========================================================
   script.js: all the interactivity for the portfolio.
   Each feature is a function. They all run at the bottom.
   ========================================================== */

// EDIT THIS: the email address that contact-form messages are addressed to.
const MY_EMAIL = "your.email@example.com";

// Tell the CSS that JavaScript is running, so reveal animations only
// hide content when JavaScript can also show it again.
document.documentElement.classList.add("js");

// Grab the elements we need once, and keep them in variables.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");

/* ---------- 1. Mobile menu ---------- */
function setMenuOpen(isOpen) {
  navLinks.classList.toggle("open", isOpen);              // add or remove the "open" class
  menuToggle.setAttribute("aria-expanded", String(isOpen)); // tells screen readers the state
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
}

function setupMobileMenu() {
  // An event listener waits for something to happen (here, a click), then runs a function.
  menuToggle.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("open"));
  });

  // Close the menu with the Escape key.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

/* ---------- 2. Smooth scrolling ---------- */
function setupSmoothScrolling() {
  // Select every link whose href starts with "#" (links to sections on this page).
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;                 // no matching section: do nothing
      event.preventDefault();              // stop the browser's instant jump
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", link.getAttribute("href")); // update the address bar
      setMenuOpen(false);                  // close the mobile menu after choosing
    });
  });
}

/* ---------- 3. Highlight the nav link of the section on screen ---------- */
function setupActiveNavLink() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");

  // IntersectionObserver tells us when an element enters or leaves the screen.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    // Only count a section as "current" when it crosses the middle band of the screen.
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Reveal animations + skill bars ---------- */
function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");

        // If this card has a skill bar, grow it to its data-level value.
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) fill.style.width = fill.dataset.level + "%";

        obs.unobserve(entry.target);   // animate once, then stop watching
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

/* ---------- 5. Interactive project cards ---------- */
function setupProjectCards() {
  const toggleButtons = document.querySelectorAll(".details-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const details = button.nextElementSibling;   // the <div class="project-details"> after the button
      const willOpen = button.getAttribute("aria-expanded") === "false";

      button.setAttribute("aria-expanded", String(willOpen));
      details.hidden = !willOpen;                  // the "hidden" attribute hides or shows it
      button.querySelector("span").textContent = willOpen ? "Hide details" : "More details";
    });
  });
}

/* ---------- 6. Dark / light mode ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  // Show a sun in dark mode (click for light) and a moon in light mode.
  themeToggle.querySelector("i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function setupThemeToggle() {
  // localStorage remembers the choice. try/catch stops errors if the browser blocks storage.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (error) { /* ignore */ }
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("portfolio-theme", next); } catch (error) { /* ignore */ }
  });
}

/* ---------- 7. Contact form validation ---------- */
// Each rule returns an error message, or "" when the value is fine.
const validators = {
  name: (value) => (value.trim().length < 2 ? "Enter your name (at least 2 characters)." : ""),
  email: (value) => {
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    return looksLikeEmail ? "" : "Enter a valid email, like name@example.com.";
  },
  subject: (value) => (value.trim().length < 3 ? "Enter a subject (at least 3 characters)." : ""),
  message: (value) => (value.trim().length < 10 ? "Write a message of at least 10 characters." : ""),
};

function validateField(input) {
  const message = validators[input.name](input.value);
  document.getElementById(input.name + "-error").textContent = message;
  input.closest(".field").classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", String(message !== ""));
  return message === "";
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const inputs = form.querySelectorAll("input, textarea");

  // Check each field when the person leaves it, and re-check while they fix an error.
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();   // stop the page from reloading
    status.className = "form-status";

    // Validate every field (don't stop at the first error, so all errors show).
    let allValid = true;
    inputs.forEach((input) => { if (!validateField(input)) allValid = false; });

    if (!allValid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.classList.add("fail");
      return;
    }

    if (MY_EMAIL === "your.email@example.com") {
      status.textContent = "The form is valid, but MY_EMAIL in script.js is still the placeholder. Add your real email first.";
      status.classList.add("fail");
      return;
    }

    // A website with no backend cannot send email by itself.
    // So we open the visitor's own email app with the message already filled in.
    const data = new FormData(form);
    const body = `${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`;
    window.location.href =
      `mailto:${MY_EMAIL}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;

    status.textContent = "Your email app should now open with the message ready. Press Send there to deliver it.";
    status.classList.add("success");
    form.reset();
  });
}

/* ---------- 8. Back to top button ---------- */
function setupBackToTop() {
  window.addEventListener("scroll", () => {
    // Show the button after scrolling down 500 pixels.
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 9. Current year in the footer ---------- */
function setCurrentYear() {
  document.getElementById("current-year").textContent = new Date().getFullYear();
}

/* ---------- Start everything ---------- */
setupMobileMenu();
setupSmoothScrolling();
setupActiveNavLink();
setupRevealAnimations();
setupProjectCards();
setupThemeToggle();
setupContactForm();
setupBackToTop();
setCurrentYear();
