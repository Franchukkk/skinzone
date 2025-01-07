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