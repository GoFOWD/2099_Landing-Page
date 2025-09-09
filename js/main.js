const animationMents = document.querySelectorAll(".animationMent");

const mentObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
			} else {
				// 뷰포트에서 벗어났을 때 원래 상태로 복구
				entry.target.style.opacity = 0;
			}
		});
	},
	{ threshold: 0.5 } // 얼마나 보여야 감지할지 조절
);

animationMents.forEach(animationMent => mentObserver.observe(animationMent));