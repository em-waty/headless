document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide", {
    type: "fade",
    drag: false,
    arrows: false,
    pagination: false,
    rewind: true,
  }).mount();

  // Custom control buttons
  document
    .getElementById("previous-slide")
    .addEventListener("click", function () {
      splide.go("-");
    });

  document.getElementById("next-slide").addEventListener("click", function () {
    splide.go("+");
  });
});
