document.addEventListener("DOMContentLoaded", function () {
  // Product Image Slider
  var productSwiper = new Swiper("#product-slider", {
    slidesPerView: 1, // Only one product image visible at a time
    spaceBetween: 0, // Space between slides if you want, set to 0 if not needed
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
