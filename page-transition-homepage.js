let transitionTrigger = $(".page-loader_trigger");
let introDurationMS = 1600;
let exitDurationMS = 1200;
let excludedClass = "no-transition";
let animationsInitialized = false; // Flag to check if GSAP animations have been initialized

function reinitializeGSAPAnimations() {
  if (typeof setupAnimation === "function" && !animationsInitialized) {
    setupAnimation();
    animationsInitialized = true; // Mark the animations as initialized
  }
}

if (transitionTrigger.length > 0) {
  transitionTrigger.click();
  $("body").addClass("no-scroll-transition");
  setTimeout(() => {
    $("body").removeClass("no-scroll-transition");
    reinitializeGSAPAnimations(); // Setup GSAP animations after intro
  }, introDurationMS);
}

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

window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

setTimeout(() => {
  $(window).on("resize", function () {
    setTimeout(() => {
      $(".page-loader").css("display", "none");
    }, 50);
  });
}, introDurationMS);
