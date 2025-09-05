// 페이지 로드 시 애니메이션 실행
            document.addEventListener('DOMContentLoaded', function () {
                // 메트릭 바 애니메이션
                setTimeout(function () {
                    const bars = document.querySelectorAll('.metric-fill');
                    bars.forEach(function (bar) {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }, 500);

                // 호버 효과 (모바일에서는 터치 이벤트)
                const cards = document.querySelectorAll('.comp-card');
                cards.forEach(function (card) {
                    card.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-5px)';
                    });
                    card.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0)';
                    });
                });
            });