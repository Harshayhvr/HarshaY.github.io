const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const siteHeader = document.querySelector(".site-header");
const backToTop = document.querySelector("#backToTop");
const currentYear = document.querySelector("#currentYear");
const navigationAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function setMenuState(isOpen) {
  if (!menuButton || !navLinks) return;

  menuButton.classList.toggle("open", isOpen);
  navLinks.classList.toggle("open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = !navLinks.classList.contains("open");
    setMenuState(isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      setMenuState(false);
    }
  });
}

function handleScroll() {
  const scrollY = window.scrollY;

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollY > 20);
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", scrollY > 650);
  }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -70px",
    threshold: 0.08,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.id;

      navigationAnchors.forEach((anchor) => {
        const targetId = anchor.getAttribute("href").replace("#", "");
        anchor.classList.toggle("active", targetId === currentId);
      });
    });
  },
  {
    rootMargin: "-32% 0px -58% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => navigationObserver.observe(section));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});
