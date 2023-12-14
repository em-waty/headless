window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

gsap.registerPlugin(ScrollTrigger);

function setupAnimation() {
  if (window.innerWidth > 568) {
    fadeWords(); // Initiate word animations only for larger viewports
  }
  animateImages(); // Initiate image animations
}

function fadeWords() {
  const sectionHeight = document.querySelector(
    ".who-we-are_sticky-wrapper"
  ).offsetHeight;
  const wordElements = document.querySelectorAll(".who-we-are_text");
  const fadeDurationFactor = 0.5;
  const fadeDuration =
    (sectionHeight / wordElements.length) * fadeDurationFactor;

  // Adjusting the start for mobile
  let mobileAdjustment = 0;

  wordElements.forEach((span, index) => {
    gsap.fromTo(
      span,
      {
        opacity: 0.1,
        force3D: true,
      },
      {
        opacity: 1,
        force3D: true,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".who-we-are_story-wrapper",
          start: `top+=${fadeDuration * index + mobileAdjustment}px top`,
          end: `top+=${fadeDuration * (index + 0.5)}px top`,
          scrub: true,
          toggleActions: "play none reverse none",
        },
      }
    );
  });
}

function animateImages() {
  const wrappers = document.querySelectorAll(
    ".who-we-are_image-collage-wrapper"
  );

  wrappers.forEach((wrapper) => {
    const images = wrapper.querySelectorAll(".who-we-are_image-2");

    images.forEach((img) => {
      const yPercentValue =
        Math.random() > 0.5 ? randomInRange(-20, -10) : randomInRange(10, 20);

      gsap.to(img, {
        yPercent: yPercentValue,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: wrapper,
          scrub: 1.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
    });
  });
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("DOMContentLoaded", () => {
  const loaderDuration = 1600; // Assuming 5 seconds for the sake of this example, adjust as needed
  const animationStartDelay = loaderDuration * 0.9; // Starting at 70% of the loader's duration
  setupAnimation();
  window.addEventListener("resize", setupAnimation);

  const wrapper = document.querySelector(".editors-choices_wrapper");

  function isWrapperAtTop() {
    const rect = wrapper.getBoundingClientRect();
    const tolerance = 5; // Allow a margin of error of 5 pixels
    return (
      rect.top <= tolerance && rect.bottom >= window.innerHeight - tolerance
    );
  }

  window.addEventListener("scroll", () => {
    if (isWrapperAtTop()) {
      console.log("Wrapper is in full view!");
    } else {
      console.log("Wrapper is not in full view.");
    }
  });

  let totalDuration = 2;
  let numberOfImages = document.querySelectorAll(".hero_image").length;
  let fadeDuration = totalDuration / (numberOfImages - 1);

  let tl = gsap.timeline();

  // Flashing effect for the images, excluding the last image
  for (let i = 1; i < numberOfImages; i++) {
    tl.to(
      `.hero_image._${i < 10 ? "0" + i : i}`,
      {
        duration: fadeDuration,
        force3D: true,
        opacity: 0,
        stagger: fadeDuration,
      },
      `flash${i}`
    );
  }

  let scaleUpStartTime = 0.99 * (numberOfImages - 1) * fadeDuration;

  tl.to(
    ".hero_image-wrapper",
    {
      duration: 1.2,
      force3D: true,
      width: "100dvw",
      height: "100dvh",
      ease: "power2.out",
    },
    scaleUpStartTime
  )
    .to(
      ".hero_image",
      {
        duration: 1.2,
        scale: 1.2,
        force3D: true,
        ease: "power2.out",
      },
      scaleUpStartTime
    )
    .to(
      ".hero_filter-overlay",
      {
        duration: 1,
        opacity: 1,
        force3D: true,
        ease: "power2.out",
      },
      ">-0.4"
    )
    .to(
      ".hero_label",
      {
        duration: 0.5,
        opacity: 1,
        force3D: true,
        ease: "power2.out",
      },
      ">-1"
    )
    .fromTo(
      ".hero-content_verdevista-logo",
      {
        y: "100%",
      },
      {
        duration: 1,
        y: "0%",
        force3D: true,
        stagger: 0.1,
        ease: "expo.out",
      },
      ">-1"
    );

  // Parallax effect for the hero image
  gsap.to(".hero_image", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero_image",
      force3D: true,
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });
  if (window.innerWidth > 840) {
    let container = document.querySelector(".editors-choices_wrapper");
    let navbar = document.querySelector(".navbar");
    let products = gsap.utils.toArray(
      ".editor-choices_product-1-content, .editor-choices_product-2-content, .editor-choices_product-3-content"
    );

    // Parallax effects for the product images
    for (let i = 1; i <= 3; i++) {
      gsap.to(`.editor-choices_product-image-${i}`, {
        x: "20%",
        scrollTrigger: {
          trigger: ".editors-choices_wrapper",
          scrub: true,
          start: "top top",
          end: () => `+=${products[0].offsetWidth * products.length}`,
        },
      });
    }

    // Horizontal scrolling effect for products
    gsap.to(
      products,
      {
        xPercent: -100 * (products.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".editors-choices_wrapper",
          pin: true,
          scrub: 1,
          snap: 1 / (products.length - 1),
          end: () => `+=${products[0].offsetWidth * products.length}`,
          onUpdate: (self) => {
            let progress = self.progress;
            if (progress < 0.25) {
              gsap.to(container, {
                backgroundColor: "#FFF9F3",
                duration: 0.25,
              });
              gsap.to(navbar, { backgroundColor: "#FFF9F3", duration: 0.25 });
            } else if (progress >= 0.25 && progress < 0.75) {
              gsap.to(container, {
                backgroundColor: "#F3FBFF",
                duration: 0.25,
              });
              gsap.to(navbar, { backgroundColor: "#F3FBFF", duration: 0.25 });
            } else if (progress >= 0.75) {
              gsap.to(container, {
                backgroundColor: "#FBF3FF",
                duration: 0.25,
              });
              gsap.to(navbar, { backgroundColor: "#FBF3FF", duration: 0.25 });
            }
          },
          onLeaveBack: () => {
            gsap.to(navbar, { backgroundColor: "#F3FFF9", duration: 0.25 });
          },
          onLeave: () => {
            gsap.to(navbar, { backgroundColor: "#F3FFF9", duration: 0.25 });
          },
        },
      },
      animationStartDelay
    );
  }
});
