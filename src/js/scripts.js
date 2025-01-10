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