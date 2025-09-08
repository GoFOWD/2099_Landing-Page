const signup = document.querySelector("#signup-container");
const welcome = document.querySelector("#welcome-container");
const signupForm = document.querySelector("#signup-form");
const userPasswordInput = document.querySelector("#user-password");
const userPasswordInputCheck = document.querySelector("#user-password-check");
const signUpBtn = document.querySelector("#signup-btn");
const patternHelp = document.querySelector("#pattern-help");
const wrongMessage = document.querySelector("#wrong-message");

// submit되면 회원가임 검증
signupForm.addEventListener("submit", event => {
	// 비밀 번호 유효성 객체 생성
	const pattern = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}");

	// 브라우저 기본 검증을 먼저 통과시키기
	if (!signupForm.checkValidity()) {
		return; // 이름, 이메일 입력 안하면 밑에 로직 실행 안하고 종료
	}

	// 기본 검증을 통과했으면 브라우저 기본 검증 막고 커스텀 검증 수행
	event.preventDefault();

	// 비밀번호 유효성 검증
	// 적합하지 않으면 아래 안내 문구 붉게 변하고 위 아래 애니메이션
	if (!pattern.test(userPasswordInput.value)) {
		userPasswordInput.focus();
		patternHelp.classList.add("text-danger");
		patternHelp.classList.add("wrong-animation");
		patternHelp.addEventListener(
			"animationend",
			() => {
				patternHelp.classList.remove("wrong-animation");
			},
			{ once: true }
		);
		return; // 비밀번호 검증 실패시 함수 종료
	} else {
		patternHelp.classList.remove("text-danger");
		patternHelp.classList.remove("wrong-animation");
	}

	// 비밀번호 일치 체크
	if (userPasswordInput.value !== userPasswordInputCheck.value) {
		wrongMessage.classList.remove("d-none");
		return; // 비밀번호 불일치시 함수 종료
	} else {
		wrongMessage.classList.add("d-none");
	}

	// 검증 통화 하면 아래 로직 실행

	// 환영 페이지 등장
	signup.classList.add("d-none");
	welcome.classList.remove("d-none");

	//localstorage에 저장
	const userName = document.querySelector("#user-name").value.trim();
	const userEmail = document.querySelector("#user-email").value.trim();
	const userPassword = document.querySelector("#user-password").value.trim();
	userInfoStorage(userName, userEmail, userPassword);
});

// 사용자 정보 localstorage에 저장하는 함수
function userInfoStorage(userName, userEmail, userPassword) {
	// 유저 정보 객체 생성
	const newUser = {
		userName: userName,
		userEmail: userEmail,
		userPassword: userPassword
	};

	// localstorage에 있는 유저 정보 불러오고 새 유저 객체 배열에 추가하기

	let users = JSON.parse(localStorage.getItem("users"));

	if (users) {
		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));
	} else {
		users = [];
		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));
	}
}
