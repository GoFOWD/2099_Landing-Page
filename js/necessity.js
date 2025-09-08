// necessity.js - 방법 3: Intersection Observer 사용 (고급)
const slides = document.querySelectorAll(".nSlide");
const backgroundTexts = document.querySelectorAll(".background-text");
const container = document.querySelector(".nStichyBody");
const subText = document.querySelector(".nFixed");
const totalSlides = slides.length;

// 메트릭 바 애니메이션 함수
function animateMetricBars() {
    const bars = document.querySelectorAll('.metric-fill');
    console.log('메트릭 바 애니메이션 시작, 바 개수:', bars.length);
    
    if (bars.length === 0) {
        console.log('메트릭 바를 찾을 수 없습니다.');
        return;
    }
    
    bars.forEach(function (bar, index) {
        const width = bar.getAttribute('data-width');
        if (width) {
            // 각 바마다 약간의 지연 시간을 두어 순차적으로 애니메이션
            setTimeout(() => {
                console.log(`바 ${index + 1} 애니메이션:`, width);
                bar.style.width = width;
            }, index * 100); // 100ms씩 지연
        }
    });
}

// 카드 호버 효과 초기화
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.comp-card');
    console.log('카드 개수:', cards.length);
    
    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Intersection Observer로 비교 섹션이 보일 때 애니메이션 실행
function initIntersectionObserver() {
    // 비교 카드 섹션을 찾습니다
    const comparisonSection = document.querySelector('.comparison-cards');
    
    if (!comparisonSection) {
        console.log('comparison-cards 섹션을 찾을 수 없어 재시도합니다.');
        setTimeout(initIntersectionObserver, 200);
        return;
    }
    
    console.log('Intersection Observer 설정됨');
    
    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('비교 섹션 가시성:', entry.isIntersecting);
            
            if (entry.isIntersecting) {
                console.log('비교 섹션이 화면에 나타남 - 메트릭 바 애니메이션 시작');
                
                // 약간의 지연 후 애니메이션 시작
                setTimeout(() => {
                    animateMetricBars();
                }, 300);
                
                // 한 번만 실행하고 관찰 중단
                observer.disconnect();
            }
        });
    }, {
        // 옵션: 50% 이상 보일 때 트리거
        threshold: 0.3,
        // 루트 마진: 화면 하단에서 100px 전에 미리 트리거
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 비교 섹션 관찰 시작
    observer.observe(comparisonSection);
}

// 전체 초기화 함수
function initNecessityAnimations() {
    console.log('necessity 애니메이션 초기화 시작 (방법 3)');
    
    // 카드 호버 효과 초기화
    setTimeout(() => {
        initCardHoverEffects();
    }, 100);
    
    // Intersection Observer 초기화
    setTimeout(() => {
        initIntersectionObserver();
    }, 300);
}

// 슬라이드 업데이트 함수 (기존 코드)
function updateSlides(index) {
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

    backgroundTexts.forEach(text => text.classList.remove("active"));
    if (backgroundTexts[index]) {
        backgroundTexts[index].classList.add("active");
    }
}

// 인덱스 계산 함수 (기존 코드)
function calcIndex(progress) {
    let idx = Math.floor(progress * totalSlides);
    if (idx >= totalSlides) idx = totalSlides - 1;
    if (progress > 0) {
        subText.classList.add("active");
    } else {
        subText.classList.remove("active");
    }
    return idx;
}

// 스크롤 이벤트 리스너
window.addEventListener("scroll", () => {
    const progress = Math.min(
        Math.max(
            (window.scrollY - container.offsetTop) / (container.offsetHeight - window.innerHeight), 0), 1
    );
    const index = calcIndex(progress);
    updateSlides(index);
});

// 초기화 실행
console.log('necessity.js 로드됨 (방법 3 - Intersection Observer)');
initNecessityAnimations();
window.dispatchEvent(new Event('scroll'));