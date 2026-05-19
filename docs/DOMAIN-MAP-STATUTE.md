# Map 도메인 규칙

## 라우트

| 경로 | 컴포넌트 | 가드 |
|------|----------|------|
| `/` | MainMap | 없음 (공개) |

## 지도 라이브러리

- `react-simple-maps`: SVG 기반 세계지도
- 국가 클릭 → 해당 국가 코드로 Book 도메인 데이터 필터링

## 색상 설정

- 저장 위치: `profiles` 테이블 (`map_pin_color`, `map_fill_color`)
- 관리: `src/hooks/useMapColors.ts`
- 컴포넌트: `src/components/map/ColorSettings.tsx`

## 통계 바

- 표시 항목: 읽은 나라 수, 대륙 수, 전체 책 수, 올해 추가한 책 수
- 컴포넌트: `src/components/book/StatsBar.tsx`

## 국가 사이드 패널

- 국가 클릭 시 해당 나라의 책 목록 표시
- 패널에서 책 수정 및 삭제 가능
- 컴포넌트: `src/components/map/CountrySidePanel.tsx`

## 컴포넌트

- `src/views/MainMap.tsx`: 지도 메인 페이지
- `src/components/map/WorldMap.tsx`: 세계지도 렌더링
- `src/components/map/CountrySidePanel.tsx`: 국가별 책 목록 사이드 패널
- `src/components/map/ColorSettings.tsx`: 지도 색상 설정
- `src/components/map/ZoomControls.tsx`: 지도 줌 컨트롤
- `src/utils/countries.ts`: 국가 코드 / 대륙 데이터 유틸
