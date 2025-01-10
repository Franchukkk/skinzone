// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector("body");
//     const circles = Array.from(container.querySelectorAll(".circle"));
//     const screenWidth = window.innerWidth;
//     const screenHeight = document.documentElement.scrollHeight;
  
//     function getRandom(min, max) {
//       return Math.random() * (max - min) + min;
//     }
  
//     function createNewCircle() {
//       const circle = document.createElement("div");
//       circle.className = "circle";
//       container.appendChild(circle);
//       circles.push(circle);
//       const size = getRandom(10, 20);
//       circle.style.width = `${size}px`;
//       circle.style.height = `${size}px`;
//       circle.style.left = `${getRandom(0, screenWidth - size)}px`;
//       circle.style.top = `${window.scrollY}px`;
//       circle.speed = getRandom(1, 3);
//     }
  
//     function resetCirclePosition(circle) {
//       const size = getRandom(10, 20);
//       circle.style.width = `${size}px`;
//       circle.style.height = `${size}px`;
//       circle.style.left = `${getRandom(0, screenWidth - size)}px`;
//       circle.style.top = `-${size}px`;
//       circle.speed = getRandom(1, 3);
//     }
  
//     function updateCirclePosition(circle) {
//       const top = parseFloat(circle.style.top);

//       circle.style.top = `${top + circle.speed}px`;
  
//       if (top > screenHeight) {
//         console.log(1);
//         resetCirclePosition(circle);
//       }
//     }
  
//     function initCircles() {
//       circles.forEach((circle) => {
//         resetCirclePosition(circle);
//       });
//     }
  
//     function animate() {
//       circles.forEach((circle) => {
//         updateCirclePosition(circle);
//       });
//       requestAnimationFrame(animate);
//     }
  
//     initCircles();
//     animate();
    
//     setInterval(createNewCircle, 5000);
//   });


document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 0.8;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 30;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); // Remove when it goes off the bottom edge
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
});

const paymentSlider = new Swiper('.payment-slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    speed: 1000,
    breakpoints: {
        320: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 3,
        },

        1160: {
            slidesPerView: 4,
        }
    }
});