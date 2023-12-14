"use strict";

if (Webflow.env("editor") === undefined) {
  // Check if viewport width is greater than 768 pixels
  if (window.innerWidth > 468) {
    window.lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      infinite: false,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    window.lenis && window.lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    window.lenis && window.lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      window.lenis && window.lenis.stop();
    } else {
      window.lenis && window.lenis.start();
    }
  });
}
