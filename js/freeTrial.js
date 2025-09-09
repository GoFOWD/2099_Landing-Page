const textarea = document.getElementById('promptInput');
const charCount = document.getElementById('charCount');
const minChars = 25;
const maxChars = 1000;
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');

charCount.textContent = `${textarea.value.length} / ${maxChars}`;
textarea.addEventListener('input', () => {
  const length = textarea.value.length;
  charCount.textContent = `${length} / ${maxChars}`;
  charCount.style.color = length < minChars ? 'red' : 'gray';
  textarea.scrollTop = textarea.scrollHeight;
});

// 이미지 선택 시 썸네일 표시
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      imagePreview.src = evt.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

const promptSection = document.getElementById('promptSection');
const editorSection = document.getElementById('editorSection');
const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', () => {
  const prompt = textarea.value.trim();
  if(!prompt) return alert("프롬프트를 입력해주세요!");

  promptSection.style.transition = "opacity 0.5s";
  promptSection.style.opacity = 0;

  setTimeout(() => {
    promptSection.style.display = "none";
    editorSection.style.display = "flex";

    const loadingBox = document.getElementById('loadingBox');
    const loadingMessage = document.getElementById('loadingMessage');
    const progressBarInner = document.getElementById('progressBarInner');
    const editorContent = document.getElementById('editorContent');

    loadingBox.style.display = "flex";
    editorContent.style.display = "none";

    const messages = [
      "영상 생성 중...",
      "스크립트 분석 완료",
      "영상 구성 중...",
      "음성 및 효과 추가 대기",
      "예상 완료 시간: 약 30초"
    ];

    let index = 0;
    let progress = 0;
    loadingMessage.textContent = messages[index];
    progressBarInner.style.width = `${progress}%`;

    const interval = setInterval(() => {
      index++;
      progress += 20;
      progressBarInner.style.width = `${progress}%`;
      if(index < messages.length){
        loadingMessage.textContent = messages[index];
      } else {
        clearInterval(interval);
        loadingBox.style.display = "none";
        editorContent.style.display = "block";
        initVideoControls();
      }
    }, 1500);
  }, 500);
});

function toggleFilter(el){
  document.querySelectorAll('.filter-box').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

// --- 비디오 볼륨과 타임라인 초기화 ---
function initVideoControls() {
  const video = document.getElementById('videoPlayer');
  const bgmVolume = document.getElementById('bgmVolume');
  const volumeLabel = document.getElementById('volumeLabel');
  const timeline = document.getElementById('timeline');

  // 초기 볼륨 60%
  video.volume = 0.6;
  bgmVolume.value = 60;
  volumeLabel.textContent = `볼륨 60%`;

  // 볼륨 슬라이더 연동
  bgmVolume.addEventListener('input', () => {
    const val = bgmVolume.value;
    video.volume = val / 100;
    volumeLabel.textContent = `볼륨 ${val}%`;
  });

  // 타임라인 클릭 시 영상 위치 이동
  timeline.addEventListener('click', (e) => {
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const newTime = ratio * video.duration;
    video.currentTime = newTime;
  });
}
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

imageInput.addEventListener('change', (e) => {
  const files = e.target.files;
  for(const file of files){
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = document.createElement('img');
      img.src = evt.target.result;
      img.style.width = '60px';
      img.style.height = '60px';
      img.style.borderRadius = '8px';
      img.style.objectFit = 'cover';
      img.style.marginRight = '5px';
      img.style.cursor = 'pointer';

      // 클릭 시 삭제
      img.addEventListener('click', () => imagePreviewContainer.removeChild(img));

      imagePreviewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});
const imageIcon = document.getElementById('imageIcon');
imageIcon.addEventListener('click', () => {
  imageInput.click(); // 파일 선택창 열기
});
const downloadBtn = document.querySelector('.btn-success');
const videoPlayer = document.getElementById('videoPlayer');

downloadBtn.addEventListener('click', () => {
  // 예: 영상 생성이 완료되었는지 확인
  const isVideoReady = videoPlayer.readyState >= 3; // enough data
  if(!isVideoReady){
    alert("영상이 준비되지 않았습니다. 잠시 기다려주세요!");
    return;
  }

  // 다운로드 실행
  const videoSrc = videoPlayer.querySelector('source').src;
  const a = document.createElement('a');
  a.href = videoSrc;
  a.download = 'shortform_video.mp4';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});