document.addEventListener("transition-80-percent-complete", function () {
  // Set initial states
  gsap.set('[gsap-element="product-hero-image"]', { scale: 1.2 });
  gsap.set('[gsap-element="product-name"], [gsap-element="product-detail"]', {
    opacity: 0,
  });

  // Animate [gsap-element="product-name"] and [gsap-element="product-detail"]
  gsap.to('[gsap-element="product-name"], [gsap-element="product-detail"]', {
    opacity: 1,
    duration: 0.5,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Animate [gsap-element="product-hero-image"]
  gsap.to('[gsap-element="product-hero-image"]', {
    scale: 1,
    duration: 0.5,
    ease: "power3.out",
  });
});
