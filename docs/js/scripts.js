document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("body");
    const circles = Array.from(container.querySelectorAll(".circle"));
    const screenWidth = window.innerWidth;
    const screenHeight = document.documentElement.scrollHeight;
  
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function createNewCircle() {
      const circle = document.createElement("div");
      circle.className = "circle";
      container.appendChild(circle);
      circles.push(circle);
      const size = getRandom(10, 20);
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${getRandom(0, screenWidth - size)}px`;
      circle.style.top = `${window.scrollY}px`;
      circle.speed = getRandom(1, 3);
    }
  
    function resetCirclePosition(circle) {
      const size = getRandom(10, 20);
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${getRandom(0, screenWidth - size)}px`;
      circle.style.top = `-${size}px`;
      circle.speed = getRandom(1, 3);
    }
  
    function updateCirclePosition(circle) {
      const top = parseFloat(circle.style.top);

      circle.style.top = `${top + circle.speed}px`;
  
      if (top > screenHeight) {
        console.log(1);
        resetCirclePosition(circle);
      }
    }
  
    function initCircles() {
      circles.forEach((circle) => {
        resetCirclePosition(circle);
      });
    }
  
    function animate() {
      circles.forEach((circle) => {
        updateCirclePosition(circle);
      });
      requestAnimationFrame(animate);
    }
  
    initCircles();
    animate();
    
    setInterval(createNewCircle, 5000);
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
        prevEl: '.next-rev',
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

