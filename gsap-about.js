function animateHeroElements() {
  // Initial opacity and scale set
  gsap.set('[gsap-element="hero-label"], [gsap-element="hero-slogan"]', {
    opacity: 0,
  });
  gsap.set('[gsap-element="hero-image"]', { scale: 1.2 });

  // Animation for labels and slogans
  gsap.to('[gsap-element="hero-label"], [gsap-element="hero-slogan"]', {
    opacity: 1,
    duration: 1,
    stagger: 0.3, // Adjust the stagger duration as needed
    ease: "power2.out",
  });

  // Animation for hero image
  gsap.to('[gsap-element="hero-image"]', {
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  // Parallax effect for hero image
  gsap.to('[gsap-element="hero-parallax"]', {
    yPercent: -10,
    scrollTrigger: {
      trigger: '[gsap-element="hero-parallax"]',
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Parallax effect for the div
  gsap.to('[gsap-element="parallax-div"]', {
    yPercent: -50,
    scrollTrigger: {
      trigger: '[gsap-element="parallax-div"]',
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Listen for the custom event emitted when the loader reaches 50% completion
document.addEventListener("loaderFiftyPercentComplete", animateHeroElements);
