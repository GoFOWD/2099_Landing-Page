setTimeout(() => {
	const textarea = document.getElementById("promptInput");
	const charCount = document.getElementById("charCount");
	const minChars = 25;
	const maxChars = 1000;

	// 글자 수 표시
	charCount.textContent = `${textarea.value.length} / ${maxChars}`;
	textarea.addEventListener("input", () => {
		const length = textarea.value.length;
		charCount.textContent = `${length} / ${maxChars}`;
		charCount.style.color = length < minChars ? "red" : "gray";
		textarea.scrollTop = textarea.scrollHeight;
	});

	const imageInput = document.getElementById("imageInput");
	imageInput.addEventListener("change", e => {
		if (e.target.files.length > 0) {
			alert(`선택한 이미지: ${e.target.files[0].name}`);
		}
	});

	const promptSection = document.getElementById("promptSection");
	const editorSection = document.getElementById("editorSection");
	const generateBtn = document.getElementById("generateBtn");

	generateBtn.addEventListener("click", () => {
		const prompt = textarea.value.trim();
		if (!prompt) return alert("프롬프트를 입력해주세요!");

		// 프롬프트 섹션 페이드 아웃
		promptSection.style.transition = "opacity 0.5s";
		promptSection.style.opacity = 0;

		setTimeout(() => {
			promptSection.style.display = "none";
			editorSection.style.display = "flex";
			editorSection.style.opacity = 0;
			editorSection.style.transition = "opacity 0.5s";
			setTimeout(() => (editorSection.style.opacity = 1), 50);
		}, 500);
	});
}, 1000);
