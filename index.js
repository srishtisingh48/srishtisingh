const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (navLinks) {
      navLinks.classList.remove("is-open");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const orbitCard = document.querySelector(".orbit-card");
const heroTypewriter = document.getElementById("heroTypewriter");
const projectCards = document.querySelectorAll(".project-card");
const timelineItems = document.querySelectorAll(".timeline-item");
const backgroundLayers = [
  { element: document.querySelector(".stars-one"), strength: 10 },
  { element: document.querySelector(".stars-two"), strength: 16 },
  { element: document.querySelector(".constellation-one"), strength: 26 },
  { element: document.querySelector(".constellation-two"), strength: 20 },
  { element: document.querySelector(".nebula-left"), strength: 22 },
  { element: document.querySelector(".nebula-right"), strength: 28 },
].filter(({ element }) => element);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (orbitCard) {
  orbitCard.addEventListener("mousemove", (event) => {
    const rect = orbitCard.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = offsetX * 12;
    const rotateX = offsetY * -12;

    orbitCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  orbitCard.addEventListener("mouseleave", () => {
    orbitCard.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  });
}

if (heroTypewriter) {
  const fullText = heroTypewriter.dataset.text ?? heroTypewriter.textContent ?? "";
  let typewriterTimeoutId;

  const renderFullText = () => {
    window.clearTimeout(typewriterTimeoutId);
    heroTypewriter.textContent = fullText;
  };

  if (prefersReducedMotion.matches) {
    renderFullText();
  } else {
    heroTypewriter.textContent = "";

    let index = 1;
    const typeNextCharacter = () => {
      heroTypewriter.textContent = fullText.slice(0, index);

      if (index < fullText.length) {
        index += 1;
        typewriterTimeoutId = window.setTimeout(typeNextCharacter, index < 5 ? 90 : 65);
      }
    };

    typewriterTimeoutId = window.setTimeout(typeNextCharacter, 180);
  }

  prefersReducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      renderFullText();
    }
  });
}

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--project-glow-x", `${offsetX}%`);
    card.style.setProperty("--project-glow-y", `${offsetY}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--project-glow-x", "50%");
    card.style.setProperty("--project-glow-y", "50%");
  });
});

timelineItems.forEach((item) => {
  const toggle = item.querySelector(".timeline-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    timelineItems.forEach((otherItem) => {
      otherItem.classList.remove("is-open");
      const otherToggle = otherItem.querySelector(".timeline-toggle");
      if (otherToggle) {
        otherToggle.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

if (!prefersReducedMotion.matches && backgroundLayers.length > 0) {
  window.addEventListener("mousemove", (event) => {
    const offsetX = event.clientX / window.innerWidth - 0.5;
    const offsetY = event.clientY / window.innerHeight - 0.5;

    backgroundLayers.forEach(({ element, strength }) => {
      const translateX = offsetX * strength;
      const translateY = offsetY * strength;
      const scale = element.classList.contains("stars-two") ? 1.2 : 1;

      element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    });
  });

  window.addEventListener("mouseleave", () => {
    backgroundLayers.forEach(({ element }) => {
      const scale = element.classList.contains("stars-two") ? 1.2 : 1;
      element.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
    });
  });
}
