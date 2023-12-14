function animateProductWrapperOnScroll() {
  const productWrapper = document.querySelector(
    '[gsap-element="blog-article-hero-image"]'
  );

  // Setting the initial scale for productWrapper
  gsap.set(productWrapper, { scale: 1.2 });

  // Parallax effect for productWrapper
  gsap.to(productWrapper, {
    yPercent: -10, // adjust this value for more or less movement
    ease: "none",
    scrollTrigger: {
      trigger: productWrapper,
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  // Scale animation for productWrapper
  gsap.from(productWrapper, {
    scrollTrigger: {
      trigger: productWrapper,
      start: "top 80%", // Animation starts when the top of the productWrapper reaches 80% of the viewport height
      toggleActions: "play none none reverse",
    },
    scale: 1,
    duration: 0.5,
    ease: "power3.out",
  });

  // Fade-in animation for [gsap-element="blog-article"]
  const article = document.querySelector('[gsap-element="blog-article"]');

  // Set initial opacity for article to 0
  gsap.set(article, { opacity: 0 });

  gsap.to(article, {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: article,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
}

// Listen for the custom event emitted when the loader reaches 80% completion.
$(document).on("loaderEightyPercentComplete", function () {
  animateProductWrapperOnScroll();
});
