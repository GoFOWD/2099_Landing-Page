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

// 로그인 로직

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (event) => {
    const userEmailInput = document.querySelector("#loginEmail");
    const userPasswordInput = document.querySelector('#loginPassword')
    const notEnrollMsg = document.querySelector('#notEnrollMsg');

    event.preventDefault();

    // localstorage에 있는 유저 정보 불러 오기
    const users = JSON.parse(localStorage.getItem("users"));

    // 등록된 유저가 없으면 바로 메세지 출력
    if (!users) {
        notEnrollMsg.classList.remove("d-none");
        return;
    } else {
        notEnrollMsg.classList.add("d-none");
    }

    // 유저의 이메일을 키로 등록
    const userKey = userEmailInput.value;
    
    // 유저 정보들을 순회하여 해당 유저를 찾는다
    const loginUser = users.find(user => user.userEmail === userKey);


    // 유저의 아이디가 있고 등록된 비밀번호와 입력된 비밀번호가 일치하면 로그인 성공
    if (loginUser && loginUser.userPassword === userPasswordInput.value) {
        // 모달창 끄기
        const modal = document.querySelector('#staticBackdrop');
        const modalObj = bootstrap.Modal.getInstance(modal);
        modalObj.hide();
        // 로그인 버튼 없애고 유저 이름 나오기
        const headerLogin = document.querySelector('#headerLogin');
        const loginUserName = document.querySelector('#loginUser-name');

        headerLogin.classList.add('d-none');
        loginUserName.classList.remove('d-none');
        loginUserName.textContent = `안녕하세요 ${loginUser.userName}님!`

    } else {
        notEnrollMsg.classList.remove("d-none");
    }

})