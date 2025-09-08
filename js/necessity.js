// necessity.js 파일 수정
const slides = document.querySelectorAll(".nSlide");
const backgroundTexts = document.querySelectorAll(".background-text");
const container = document.querySelector(".nStichyBody");
const subText = document.querySelector(".nFixed");
const totalSlides = slides.length;


function updateSlides(index) {
    // 기존 슬라이드(카드) 로직은 그대로 유지
    slides.forEach(slide => {
        slide.classList.remove("active", "stack1", "stack2", "inactive");
        slide.style.zIndex = '';
        slide.style.transform = '';
        slide.style.opacity = '';
    });

    slides[index].classList.add("active");
    slides[index].style.zIndex = 3;
    slides[index].style.transform = "scale(1) translateY(0)";
    slides[index].style.opacity = 1;

    for (let n = 1; n <= 2; n++) {
        const stackIdx = (index + n) % totalSlides;
        slides[stackIdx].classList.add(`stack${n}`);
        slides[stackIdx].style.zIndex = 3 - n;
        slides[stackIdx].style.transform = `scale(${1 - n * 0.07}) translateY(${n * 3}rem)`;
        slides[stackIdx].style.opacity = 0.5;
    }

    // 모든 배경 텍스트의 .active 클래스 제거
    backgroundTexts.forEach(text => text.classList.remove("active"));

    // 현재 인덱스에 해당하는 배경 텍스트에만 .active 클래스 추가
    if (backgroundTexts[index]) {
        backgroundTexts[index].classList.add("active");
    }
}

// 스크롤 진행도에 따라 인덱스 계산
function calcIndex(progress) {
    // 진행도(0 ~ 1)를 총 슬라이드 수에 곱하여 현재 인덱스 계산
    let idx = Math.floor(progress * totalSlides);
    if (idx >= totalSlides) idx = totalSlides - 1;
    if(progress > 0 && progress < 1){
        subText.classList.add("active");
    }else{
        subText.classList.remove("active");
    };
    return idx;
}

window.addEventListener("scroll", () => {
    // 스크롤 진행도를 계산하여 0부터 1까지의 값으로 만듦
    const progress = Math.min(
        Math.max(
            (window.scrollY - container.offsetTop) / (container.offsetHeight - window.innerHeight), 0), 1
    );
    const index = calcIndex(progress);
    updateSlides(index);
});

// 페이지 로드 시 초기 실행
window.dispatchEvent(new Event('scroll'));