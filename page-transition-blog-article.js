Wized.request.await("Retrieve Single Blog Article", (response) => {
  // Assuming the response is successful, we'll proceed with the page transition logic.
  // You might want to add additional checks on the response if necessary.

  let transitionTrigger = $(".page-loader_trigger");
  let introDurationMS = 1600;
  let exitDurationMS = 1200;
  let excludedClass = "no-transition";
  let animationsInitialized = false; // Flag to check if GSAP animations have been initialized

  // On Page Load
  if (transitionTrigger.length > 0) {
    transitionTrigger.click();
    $("body").addClass("no-scroll-transition");

    // 80% of introDurationMS
    let animationStartDelay = 0.5 * introDurationMS;

    setTimeout(() => {
      // Emit an event when 80% of the loader duration has passed.
      $(document).trigger("loaderEightyPercentComplete");
    }, animationStartDelay);

    setTimeout(() => {
      $("body").removeClass("no-scroll-transition");
      reinitializeGSAPAnimations(); // Setup GSAP animations after intro
    }, introDurationMS);
  }

  // On Link Click
  $(document).on("click", "a", function (e) {
    if (
      $(this).prop("hostname") == window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      !$(this).hasClass(excludedClass) &&
      $(this).attr("target") !== "_blank" &&
      transitionTrigger.length > 0
    ) {
      e.preventDefault();
      $("body").addClass("no-scroll-transition");
      let transitionURL = $(this).attr("href");
      transitionTrigger.click();
      setTimeout(function () {
        window.location = transitionURL;
      }, exitDurationMS);
    }
  });

  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };

  // Hide Transition on Window Width Resize
  setTimeout(() => {
    $(window).on("resize", function () {
      setTimeout(() => {
        $(".page-loader").css("display", "none");
      }, 50);
    });
  }, introDurationMS);
}); // End of Wized.request.await
