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
      const size = getRandom(10, 50);
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.left = `${getRandom(0, screenWidth - size)}px`;
      circle.style.top = `${window.scrollY}px`;
      circle.speed = getRandom(1, 3);
    }
  
    function resetCirclePosition(circle) {
      const size = getRandom(10, 50);
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
    
    setInterval(createNewCircle, 10000);
  });