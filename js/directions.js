// 오시는길 지도 관리 클래스
class DirectionsMap {
    constructor() {
        this.map = null;
        this.marker = null;
        this.shortpickLocation = [37.5665, 127.0780]; // 숏픽 본사 위치
        this.mapConfig = {
            zoom: 16,
            tileLayer: {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '© OpenStreetMap contributors'
            }
        };
    }

    // 지도 초기화
    async init() {
        try {
            console.log('🗺️ 지도 초기화 시작');
            
            // Leaflet 라이브러리 확인
            if (typeof L === 'undefined') {
                throw new Error('Leaflet 라이브러리가 로드되지 않았습니다');
            }

            // 지도 컨테이너 확인
            const mapElement = document.getElementById('map');
            if (!mapElement) {
                throw new Error('지도 컨테이너를 찾을 수 없습니다');
            }

            // 지도 생성
            this.map = L.map('map').setView(this.shortpickLocation, this.mapConfig.zoom);
            console.log('✅ 지도 생성 완료');

            // 타일 레이어 추가
            L.tileLayer(this.mapConfig.tileLayer.url, {
                attribution: this.mapConfig.tileLayer.attribution
            }).addTo(this.map);
            console.log('✅ 타일 레이어 추가 완료');

            // 마커 추가
            this.addMarker();
            console.log('✅ 마커 추가 완료');

            // 지도 컨트롤 추가
            this.addMapControls();
            console.log('✅ 지도 컨트롤 추가 완료');

            console.log('🎉 지도 초기화 완료');
            return true;

        } catch (error) {
            console.error('❌ 지도 초기화 실패:', error);
            this.showError(error.message);
            return false;
        }
    }

    // 마커 추가
    addMarker() {
        this.marker = L.marker(this.shortpickLocation).addTo(this.map);
        
        const popupContent = `
            <div style="text-align: center; padding: 10px;">
                <h4 style="margin: 0 0 10px 0; color: #2c2c2c;">🏢 숏픽 본사</h4>
                <p style="margin: 5px 0; color: #666;">서울특별시 강남구 테헤란로 123</p>
                <p style="margin: 5px 0; color: #666;">숏픽빌딩 10층</p>
                <p style="margin: 5px 0; color: #666;">📞 02-1234-5678</p>
            </div>
        `;
        
        this.marker.bindPopup(popupContent).openPopup();
    }

    // 지도 컨트롤 추가
    addMapControls() {
        // 스케일 컨트롤
        L.control.scale({
            position: 'bottomright',
            metric: true,
            imperial: false
        }).addTo(this.map);

        // 줌 컨트롤
        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
    }

    // 에러 표시
    showError(message) {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100%; 
                    background: linear-gradient(135deg, #f8f6f3, #f0ede7); 
                    border-radius: 10px; 
                    color: #666;
                    text-align: center;
                    padding: 20px;
                ">
                    <div>
                        <h4 style="margin-bottom: 15px; color: #d32f2f;">⚠️ 지도를 불러올 수 없습니다</h4>
                        <p style="margin: 0 0 10px 0;">${message}</p>
                        <p style="margin: 0; font-size: 0.9em; color: #999;">네트워크 연결을 확인해주세요</p>
                    </div>
                </div>
            `;
        }
    }

    // 지도 리사이즈 (반응형 대응)
    resize() {
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
    }
}

// 전역 변수
let directionsMap = null;

// 지도 초기화 함수
async function initMap() {
    directionsMap = new DirectionsMap();
    await directionsMap.init();
}

// 페이지 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📄 오시는길 페이지 로드 완료');
    
    // 헤더와 푸터 로드
    await loadHeaderFooter();
    
    // 지도 초기화
    await initMap();
    
    // 이벤트 리스너 설정
    setupEventListeners();
});

// 헤더와 푸터 로드
async function loadHeaderFooter() {
    try {
        // 헤더 로드
        const headerResponse = await fetch('header.html');
        const headerData = await headerResponse.text();
        document.getElementById('header').innerHTML = headerData;
        console.log('✅ 헤더 로드 완료');

        // 푸터 로드
        const footerResponse = await fetch('footer.html');
        const footerData = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerData;
        console.log('✅ 푸터 로드 완료');

        // 헤더 스크립트 로드
        await loadScript('../js/header.js');
        console.log('✅ 헤더 스크립트 로드 완료');

    } catch (error) {
        console.error('❌ 헤더/푸터 로드 실패:', error);
    }
}

// 스크립트 동적 로드
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 윈도우 리사이즈 이벤트
    window.addEventListener('resize', () => {
        if (directionsMap) {
            directionsMap.resize();
        }
    });

    // 페이지 가시성 변경 이벤트 (탭 전환 시)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && directionsMap && directionsMap.map) {
            setTimeout(() => {
                directionsMap.map.invalidateSize();
            }, 100);
        }
    });
}

// 전역 함수로도 노출 (기존 코드 호환성)
window.initMap = initMap;