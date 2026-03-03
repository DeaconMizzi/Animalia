/*!
* Start Bootstrap - One Page Wonder v6.0.6 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
(() => {
  "use strict";

  const revealTargets = document.querySelectorAll(".content-section, .section, .card, .story-callout");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("reveal-visible"));
  }

  const parallaxItems = document.querySelectorAll(".img-fluid, .card img");
  parallaxItems.forEach((item) => item.classList.add("parallax-media"));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    parallaxItems.forEach((item) => {
      item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 4;
        const rotateX = ((y / rect.height) - 0.5) * -4;
        item.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link[href^='#'], .navbar-nav .nav-link[href*='index.html#']"));
  const sectionTargets = navLinks
    .map((link) => {
      const href = link.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return null;
      const id = href.slice(hashIndex + 1);
      if (!id) return null;
      const target = document.getElementById(id);
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (sectionTargets.length) {
    const setActiveLink = (activeLink) => {
      sectionTargets.forEach(({ link }) => {
        const isActive = link === activeLink;
        link.classList.toggle("nav-active-section", isActive);
      });
    };

    const onScroll = () => {
      const scrollOffset = window.scrollY + 180;
      let current = sectionTargets[0];
      sectionTargets.forEach((entry) => {
        if (entry.target.offsetTop <= scrollOffset) current = entry;
      });
      setActiveLink(current.link);
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
