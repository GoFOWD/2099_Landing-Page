// 헤더 무료 시작하기 버튼 누르면 freeTrail.html의 textarea필드 포커스
const freeStartBtn = document.querySelector("#freeStartBtn");
const mobileFreeStartBtn = document.querySelector("#mobile-freeStartBtn");
const textArea = document.querySelector(".prompt-box textarea")

mobileFreeStartBtn.addEventListener("click", () => {
    textArea.focus();
})
freeStartBtn.addEventListener("click", () => {
    textArea.focus();
})