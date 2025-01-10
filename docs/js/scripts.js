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
document.addEventListener("scroll", () => {
    const lines = document.querySelectorAll(".marquee-line");
    const scrollTop = window.scrollY;

    lines.forEach((line, index) => {
        const isOdd = index % 2 === 0; // Непарний рядок
        const moveDirection = isOdd ? 1 : -1; // Непарні вправо, парні вліво
        const speed = 0.5; // Швидкість руху

        // Визначення нового зміщення залежно від прокрутки
        let newOffset = scrollTop * speed * moveDirection;

        // Якщо текст повністю вийшов за межі, повернути його на інший край
        const lineWidth = line.offsetWidth;
        const parentWidth = line.parentElement.offsetWidth;

        if (newOffset > parentWidth) {
            newOffset = -lineWidth;
        } else if (newOffset < -lineWidth) {
            newOffset = parentWidth;
        }

        line.style.transform = `translateX(${newOffset - 320}px)`; // Початковий зсув -300px
    });
});

const containerTop = document.querySelector(".reviews").offsetTop;

console.log(containerTop);

document.addEventListener("scroll", () => {
    const lines = document.querySelectorAll("main .marquee-line");
    
    const scrollTop = (window.scrollY - containerTop);

    lines.forEach((line, index) => {
        if (index % 2 === 0) {
            line.style.transform = `translateX(${scrollTop - 2000}px)`; // Початковий зсув -300px
        } else {
            line.style.transform = `translateX(-${scrollTop + 2000}px)`; // Початковий зсув -300px
        }


    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const discountsSlider = new Swiper('.discounts-slider', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.products-button-next',
        prevEl: '.products-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

const reviewsSlider = new Swiper('.reviews-slider', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.next-rev',
        prevEl: '.prev-rev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 30
        }
    }
});

document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('#products, #reviews, #faq, #help');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            const targetLink = document.querySelector(`nav ul li a[data-section="${section.id}"]`);
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    });
});


document.querySelector('.basket-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.basket').classList.toggle('active');
});

document.querySelector('.close-basket').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.basket').classList.remove('active');
});

document.querySelector('.burger').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.burger-open').classList.toggle('active');
});

document.querySelector('.close-burger').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.burger-open').classList.remove('active');
});


window.addEventListener('scroll', () => {
    const blocks = document.querySelectorAll('.block-hidden');

    blocks.forEach(block => {

        const blockTop = block.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;


        if (blockTop - viewportHeight <= 100) {
            block.classList.add('active');
        } else {
            block.classList.remove('active');
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count-block');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 16ms is roughly one frame
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const basketMain = document.querySelector(".basket-main")
    const basketHeader = document.querySelector(".basket-header")
    const basketFooter = document.querySelector(".basket-footer")
    const basket = document.querySelector(".basket")
    
    if (basketMain && basketHeader && basketFooter) {
        basketMain.style.height = window.innerHeight - (basketHeader.scrollHeight + basketFooter.scrollHeight) - 120 + "px"
    }
})