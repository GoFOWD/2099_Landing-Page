// js/resonance.js
(function () {
  let inited = false;

  // 카드 높이 통일
  function equalizeHeights(panel){
    if (!panel) return;
    const cards = [...panel.querySelectorAll('.card')];
    if (!cards.length) return;
    cards.forEach(c => c.style.minHeight = '');
    requestAnimationFrame(() => {
      const maxH = cards.reduce((m,c)=>Math.max(m, c.offsetHeight), 0);
      cards.forEach(c => c.style.minHeight = maxH + 'px');
    });
  }

  function init() {
    if (inited) return;
    const root = document.getElementById('resonance');
    if (!root) return;
    inited = true;

    const tabs   = [...root.querySelectorAll('.tab')];
    const panels = [...root.querySelectorAll('.panel')];

    // 기본 텍스트(백업용)
    const copyDeck = {
      "owner-pain": {
        "왜": "디지털 진입 장벽이 큽니다. 촬영·편집·광고집행이 각각 다른 도구입니다.",
        "어떻게": "사진 3장과 한 줄만 입력 → 자동 자막·음악·컷편집 → 전화/톡 버튼 삽입.",
        "결과": "첫 영상 10분 내 완성. 예약·전화 전환 시도 증가."
      },
      "owner-solution": {
        "왜": "사장님이 해야 할 일을 최소화합니다.",
        "어떻게": "업종별 템플릿과 색·폰트를 미리 세팅. 버튼 연결만 체크하면 끝.",
        "결과": "세팅 시간과 오류 감소. 소액 예산으로 테스트 가능."
      },
      "newbie-steps": {
        "왜": "시작 장벽을 낮추면 실행 빈도가 올라갑니다.",
        "어떻게": "3단계 절차와 풍선 가이드. 비율·음악 자동.",
        "결과": "첫 주 3개 제작이 쉬움."
      },
      "newbie-boost": {
        "왜": "노출 시간·문구가 결과를 좌우합니다.",
        "어떻게": "좋은 시간대 추천과 A/B 문구.",
        "결과": "조회·전화 전환률 상승."
      },
      "all-why": {
        "왜": "짧은 주목시간에 맞는 포맷.",
        "어떻게": "사진 몇 장으로 스토리화.",
        "결과": "제작비 절감과 빠른 테스트."
      },
      "all-how": {
        "왜": "반복 업무 자동화가 핵심.",
        "어떻게": "템플릿·자막·CTA 자동, 버튼 로그 기록.",
        "결과": "운영 시간이 줄고 데이터가 쌓임."
      }
    };

    // 리치 마크업 템플릿(6개 전부)
    const TPL = {
      'owner-pain':{
        '왜': `
          <div class="lead">디지털 진입 장벽이 큽니다. <span class="badge">현장 인사이트</span></div>
          <div class="kpis">
            <div class="kpi"><div class="num">3개</div><div class="unit">툴 관리(촬영·편집·광고)</div></div>
            <div class="kpi"><div class="num">1분</div><div class="unit">설명 듣고 이탈</div></div>
            <div class="kpi"><div class="num">30%</div><div class="unit">전화연결 선호</div></div>
          </div>
          <div class="divider"></div>
          <ul class="checklist">
            <li>설치·가입·연동 과정이 길다</li>
            <li>예산·결제 걱정이 먼저 든다</li>
            <li>성공 케이스가 바로 안 보인다</li>
          </ul>
        `,
        '어떻게': `
          <div class="lead">툴을 하나로 묶고, 클릭은 세 번 이내.</div>
          <ul class="checklist">
            <li>템플릿 선택 → 사진 업로드 → 완료</li>
            <li>전화/톡/지도 버튼 즉시 연결</li>
            <li>예산은 하루 5천원부터 시작</li>
          </ul>
          <div class="note">첫 실행 60초 내 <b>미리보기</b>가 나오게 설계합니다.</div>
        `,
        '결과': `
          <div class="lead">복잡함 제거가 전환을 만듭니다.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">-70%</div><div class="unit">세팅 시간</div></div>
            <div class="kpi"><div class="num">+42%</div><div class="unit">전화·방문 전환</div></div>
            <div class="kpi"><div class="num">~5천원</div><div class="unit">일일 예산</div></div>
          </div>
        `
      },
      'owner-solution':{
        '왜': `
          <div class="lead">핵심 버튼만 남겨 집중도를 높였습니다.</div>
          <ul class="checklist">
            <li>전화·예약·지도 등 <b>전환 요소</b> 중심</li>
            <li>불필요한 필드/단계 제거</li>
            <li>가이드 풍선으로 즉시 학습</li>
          </ul>
        `,
        '어떻게': `
          <div class="lead">사진 업로드 → 자동 편집 → 즉시 배포</div>
          <div class="kpis">
            <div class="kpi"><div class="num">60초</div><div class="unit">초기 게시</div></div>
            <div class="kpi"><div class="num">A/B</div><div class="unit">문구 실험</div></div>
            <div class="kpi"><div class="num">자동</div><div class="unit">비율/해시태그</div></div>
          </div>
        `,
        '결과': `
          <div class="lead">적은 예산에서도 체감되는 결과.</div>
          <ul class="checklist">
            <li>문의/전화 로그로 효과 확인</li>
            <li>주요 시간대 자동 추천</li>
            <li>지역 키워드 최적화</li>
          </ul>
        `
      },
      'newbie-steps':{
        '왜': `
          <div class="lead">시작 장벽을 낮추면 실행 빈도가 올라갑니다. <span class="badge">초보 친화</span></div>
          <div class="kpis">
            <div class="kpi"><div class="num">3단계</div><div class="unit">절차 단순화</div></div>
            <div class="kpi"><div class="num">~60초</div><div class="unit">첫 게시</div></div>
            <div class="kpi"><div class="num">0개</div><div class="unit">사전 지식 요구</div></div>
          </div>
          <div class="divider"></div>
          <ul class="checklist">
            <li>무엇부터 할지 난감함 해소</li>
            <li>촬영·편집·음악 고르기 부담 제거</li>
            <li>완료까지 길어지면 이탈 → 짧게 끝내기</li>
          </ul>
        `,
        '어떻게': `
          <div class="lead">템플릿 → 사진/문구 → 게시, 세 번으로 끝.</div>
          <ul class="checklist">
            <li>풍선 가이드로 바로 따라하기</li>
            <li>비율/음악 자동, 미리보기 즉시 생성</li>
            <li>실수 방지 체크리스트 제공</li>
          </ul>
          <div class="kpis">
            <div class="kpi"><div class="num">Auto</div><div class="unit">비율·음악</div></div>
            <div class="kpi"><div class="num">Guide</div><div class="unit">튜토리얼</div></div>
            <div class="kpi"><div class="num">Link</div><div class="unit">공유 미리보기</div></div>
          </div>
        `,
        '결과': `
          <div class="lead">첫 주에 3개 제작이 “가능”이 아니라 “쉽다”.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">~5분</div><div class="unit">영상당 작업</div></div>
            <div class="kpi"><div class="num">↑</div><div class="unit">완료율/재시도</div></div>
            <div class="kpi"><div class="num">↓</div><div class="unit">실수·되돌리기</div></div>
          </div>
          <div class="note">숫자는 예시입니다. 실제 값은 운영 데이터에 맞춰 바꾸세요.</div>
        `
      },
      'newbie-boost':{
        '왜': `
          <div class="lead">노출 시간과 문구가 결과를 좌우합니다. <span class="badge">운영 인사이트</span></div>
          <div class="kpis">
            <div class="kpi"><div class="num">2~3</div><div class="unit">핵심 시간대</div></div>
            <div class="kpi"><div class="num">A/B</div><div class="unit">문구 실험</div></div>
            <div class="kpi"><div class="num">지역</div><div class="unit">키워드 추천</div></div>
          </div>
        `,
        '어떻게': `
          <div class="lead">추천 시간대 + A/B 문구 + 자동 해시태그.</div>
          <ul class="checklist">
            <li>좋은 시간대 제안 및 예약 발행</li>
            <li>문구 두 가지를 번갈아 노출(A/B)</li>
            <li>업종·지역 기반 해시태그 자동 추천</li>
          </ul>
          <div class="note">초보도 실행만 하면 최적화가 굴러가게 설계합니다.</div>
        `,
        '결과': `
          <div class="lead">보기 좋은 때, 먹히는 말. 소액 예산에서도 체감.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">↑</div><div class="unit">조회·도달</div></div>
            <div class="kpi"><div class="num">↑</div><div class="unit">전화·문의</div></div>
            <div class="kpi"><div class="num">↓</div><div class="unit">클릭당 비용</div></div>
          </div>
        `
      },
      'all-why':{
        '왜': `
          <div class="lead">짧은 주목시간에 맞춘 숏폼이 지금의 기본 포맷.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">15초</div><div class="unit">권장 길이</div></div>
            <div class="kpi"><div class="num">~1분</div><div class="unit">제작 시간</div></div>
            <div class="kpi"><div class="num">5장→1</div><div class="unit">사진→영상</div></div>
          </div>
          <ul class="checklist">
            <li>이미지 몇 장으로 스토리를 만든다</li>
            <li>CTA(전화/예약/지도)로 바로 연결</li>
            <li>플랫폼별 비율 자동 대응</li>
          </ul>
        `,
        '어떻게': `
          <div class="lead">스토리보드 → 자동 자막/컷 → CTA 버튼.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">9:16</div><div class="unit">세로</div></div>
            <div class="kpi"><div class="num">1:1</div><div class="unit">정사각</div></div>
            <div class="kpi"><div class="num">16:9</div><div class="unit">가로</div></div>
          </div>
        `,
        '결과': `
          <div class="lead">제작비 절감 + 빠른 테스트로 학습 속도 상승.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">↓</div><div class="unit">비용/시간</div></div>
            <div class="kpi"><div class="num">Day 1</div><div class="unit">첫 결과</div></div>
            <div class="kpi"><div class="num">Loop</div><div class="unit">빠른 개선</div></div>
          </div>
        `
      },
      'all-how':{
        '왜': `
          <div class="lead">반복 업무를 자동화해야 운영이 버틴다.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">~80%</div><div class="unit">자동화 범위</div></div>
            <div class="kpi"><div class="num">12→4</div><div class="unit">수동 단계</div></div>
            <div class="kpi"><div class="num">Log</div><div class="unit">전화/버튼</div></div>
          </div>
        `,
        '어떻게': `
          <div class="lead">템플릿·자막·CTA 자동 + 로그/분석까지.</div>
          <ul class="checklist">
            <li>콜/톡/지도 클릭 로그</li>
            <li>간단 리포트로 성과 확인</li>
            <li>효율 좋은 조합은 템플릿으로 저장</li>
          </ul>
        `,
        '결과': `
          <div class="lead">운영 시간은 줄고, 데이터는 쌓인다.</div>
          <div class="kpis">
            <div class="kpi"><div class="num">↓</div><div class="unit">운영 시간</div></div>
            <div class="kpi"><div class="num">↑</div><div class="unit">재사용/확장</div></div>
            <div class="kpi"><div class="num">1주</div><div class="unit">학습 사이클</div></div>
          </div>
        `
      }
    };

    function renderRich(cardKey, infoKey){
      if (TPL[cardKey] && TPL[cardKey][infoKey]) return TPL[cardKey][infoKey];
      const txt = (copyDeck[cardKey] && copyDeck[cardKey][infoKey]) || '';
      return txt ? `<div class="lead">${txt}</div>` : '';
    }

    // 탭 전환
    function showPanel(key) {
      tabs.forEach(t => t.classList.toggle('is-active', t.dataset.target === key));
      panels.forEach(p => {
        const on = p.dataset.panel === key;
        p.hidden = !on;
        if (!on) p.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
      });
      equalizeHeights(panels.find(p => !p.hidden));
    }
    tabs.forEach(t => t.addEventListener('click', () => showPanel(t.dataset.target)));
    showPanel('owner');

    // 카드/오버레이
    panels.forEach(panel => {
      let openCard = null;

      panel.addEventListener('click', e => {
        const close = e.target.closest('.close');
        if (close) {
          const card = close.closest('.card');
          card.classList.remove('active');
          if (openCard === card) openCard = null;
          return;
        }

        const card = e.target.closest('.card');
        if (!card || !panel.contains(card)) return;
        if (e.target.closest('.extra')) return;

        if (openCard && openCard !== card) openCard.classList.remove('active');
        card.classList.add('active'); openCard = card;
        equalizeHeights(panel);

        const body  = card.querySelector('.extra-body');
        const pills = card.querySelectorAll('.pill');
        pills.forEach(p => p.setAttribute('aria-pressed', p.dataset.info === '왜' ? 'true' : 'false'));
        body.innerHTML = renderRich(card.dataset.key, '왜'); // 리치 마크업
      });

      panel.querySelectorAll('.extra').forEach(ex => {
        ex.addEventListener('click', e => {
          if (e.target.classList.contains('close')) return;
          const pill = e.target.closest('.pill');
          if (!pill) return;
          const card = ex.closest('.card');

          card.querySelectorAll('.pill').forEach(p => p.setAttribute('aria-pressed', 'false'));
          pill.setAttribute('aria-pressed', 'true');

          const body = card.querySelector('.extra-body');
          body.innerHTML = renderRich(card.dataset.key, pill.dataset.info); // 리치 마크업
          equalizeHeights(panel);
        });
      });
    });

    // ESC 닫기
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const vis = [...panels].find(p => !p.hidden);
      vis && vis.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
      equalizeHeights(vis);
    });

    // 리사이즈/로드
    window.addEventListener('resize', () => {
      const vis = panels.find(p => !p.hidden);
      equalizeHeights(vis);
    });
    window.addEventListener('load', () => {
      const vis = panels.find(p => !p.hidden);
      equalizeHeights(vis);
    });
  }

  // 즉시 시도 + 동적 주입 대응
  if (document.getElementById('resonance')) init();
  new MutationObserver(() => {
    if (!inited && document.getElementById('resonance')) init();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

// 카드 reveal (초기)
(function(){
  function mountReveal(){
    const cards = document.querySelectorAll('#resonance .card');
    if (!cards.length) return;
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('reveal'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    cards.forEach(c=>io.observe(c));
  }
  window.addEventListener('load', mountReveal);
})();

// 동적 주입 reveal
(function(){
  const seen = new WeakSet();
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });

  function mountReveal(){
    document.querySelectorAll('#resonance .card').forEach(card=>{
      if (seen.has(card)) return;
      card.classList.add('reveal-setup');
      io.observe(card);
      seen.add(card);
    });
  }
  window.addEventListener('load', mountReveal);
  new MutationObserver(mountReveal).observe(document.documentElement, { childList:true, subtree:true });
})();
