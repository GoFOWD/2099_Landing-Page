
	const reviews = document.querySelectorAll(".review");
	const musk = document.querySelector(".musk");

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				const index = Array.from(reviews).indexOf(entry.target);

				if (entry.isIntersecting) {
					// 뷰포트 안에 들어왔을 때
					entry.target.style.opacity = 1;
					if (index % 2 === 0) {
						entry.target.style.left = "-30vw";
					} else {
						entry.target.style.left = "30vw";
					}
				} else {
					// 뷰포트에서 벗어났을 때 원래 상태로 복구
					entry.target.style.opacity = 0;
					entry.target.style.left = "0";
				}
			});
		}, { threshold: 0.5 } // 얼마나 보여야 감지할지 조절 
	);

	reviews.forEach(review => observer.observe(review));

	const muskObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
			} 
		});
	}, { threshold: 0.5 });
	muskObserver.observe(musk);


