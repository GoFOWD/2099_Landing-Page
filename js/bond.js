// js/resonance.js
(function () {
  let inited = false;
    // 카드 높이 통일
  function equalizeHeights(panel){
    if (!panel) return;
    const cards = [...panel.querySelectorAll('.card')];
    if (!cards.length) return;
    cards.forEach(c => c.style.minHeight = '');                  // 초기화
    requestAnimationFrame(() => {
      const maxH = cards.reduce((m,c)=>Math.max(m, c.offsetHeight), 0);
      cards.forEach(c => c.style.minHeight = maxH + 'px');      // 통일
    });
  }


  function init() {
    if (inited) return;
    const root = document.getElementById('resonance');
    if (!root) return;

    inited = true;

    const tabs = [...root.querySelectorAll('.tab')];
    const panels = [...root.querySelectorAll('.panel')];
    const copyDeck = {
      "owner-pain": { "왜": "디지털 진입 장벽이 큽니다. 촬영·편집·광고집행이 각각 다른 도구입니다.",
                      "어떻게": "사진 3장과 한 줄만 입력 → 자동 자막·음악·컷편집 → 전화/톡 버튼 삽입.",
                      "결과": "첫 영상 10분 내 완성. 예약·전화 전환 시도 증가." },
      "owner-solution": { "왜": "사장님이 해야 할 일을 최소화합니다.",
                          "어떻게": "업종별 템플릿과 색·폰트를 미리 세팅. 버튼 연결만 체크하면 끝.",
                          "결과": "세팅 시간과 오류 감소. 소액 예산으로 테스트 가능." },
      "newbie-steps": { "왜": "시작 장벽을 낮추면 실행 빈도가 올라갑니다.",
                        "어떻게": "3단계 절차와 풍선 가이드. 비율·음악 자동.",
                        "결과": "첫 주 3개 제작이 쉬움." },
      "newbie-boost": { "왜": "노출 시간·문구가 결과를 좌우합니다.",
                        "어떻게": "좋은 시간대 추천과 A/B 문구.",
                        "결과": "조회·전화 전환률 상승." },
      "all-why": { "왜": "짧은 주목시간에 맞는 포맷.",
                   "어떻게": "사진 몇 장으로 스토리화.",
                   "결과": "제작비 절감과 빠른 테스트." },
      "all-how": { "왜": "반복 업무 자동화가 핵심.",
                   "어떻게": "템플릿·자막·CTA 자동, 버튼 로그 기록.",
                   "결과": "운영 시간이 줄고 데이터가 쌓임." }
    };

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

        const body = card.querySelector('.extra-body');
        const pills = card.querySelectorAll('.pill');
        pills.forEach(p => p.setAttribute('aria-pressed', p.dataset.info === '왜' ? 'true' : 'false'));
        body.textContent = (copyDeck[card.dataset.key] && copyDeck[card.dataset.key]['왜']) || '';
      });

      panel.querySelectorAll('.extra').forEach(ex => {
        ex.addEventListener('click', e => {
          if (e.target.classList.contains('close')) return;
          const pill = e.target.closest('.pill'); if (!pill) return;
          const card = ex.closest('.card');
          card.querySelectorAll('.pill').forEach(p => p.setAttribute('aria-pressed', 'false'));
          pill.setAttribute('aria-pressed', 'true');
          const body = card.querySelector('.extra-body');
          body.textContent = (copyDeck[card.dataset.key] && copyDeck[card.dataset.key][pill.dataset.info]) || '';
          equalizeHeights(panel);
        });
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const vis = [...panels].find(p => !p.hidden);
      vis && vis.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
      equalizeHeights(vis);
    });
      window.addEventListener('resize', () => {
    const vis = panels.find(p => !p.hidden);
    equalizeHeights(vis);
  });
  window.addEventListener('load', () => {
    const vis = panels.find(p => !p.hidden);
    equalizeHeights(vis);
  });
  }

  // 1) 즉시 시도
  if (document.getElementById('resonance')) init();
  // 2) 동적 주입 대응(MutationObserver)
  new MutationObserver(() => {
    if (!inited && document.getElementById('resonance')) init();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
