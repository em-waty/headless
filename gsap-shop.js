function animateLabelAndSlogan() {
  const heroLabel = document.querySelector('[gsap-element="hero-label"]');
  const heroSlogan = document.querySelector('[gsap-element="hero-slogan"]');
  const tl = gsap.timeline();

  tl.fromTo(
    heroLabel,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.25 }
  ).fromTo(
    heroSlogan,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.25 },
    "<" // This will make the animation start at the same time as the previous one
  );
}

function animateProductWrapperOnScroll() {
  const productWrapper = document.querySelector(
    '[gsap-element="shop-product-wrapper"]'
  );

  gsap.from(productWrapper, {
    scrollTrigger: {
      trigger: productWrapper,
      start: "top 80%", // Animation starts when the top of the productWrapper reaches 80% of the viewport height
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}

// Listen for the custom event emitted when the loader reaches 80% completion.
$(document).on("loaderEightyPercentComplete", function () {
  animateLabelAndSlogan();
  animateProductWrapperOnScroll();
});
