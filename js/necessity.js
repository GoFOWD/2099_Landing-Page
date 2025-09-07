const slides = document.querySelectorAll(".nSlide");
const container = document.querySelector(".nStichyBody");
const totalSlides = slides.length;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;

    // container 내부에서의 스크롤 비율 (0~1)
    const progress = Math.min(Math.max((scrollY - containerTop) / containerHeight, 0), 1);

    // 현재 보여줄 인덱스 계산
    const index = Math.floor(progress * totalSlides +0.5);

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
});