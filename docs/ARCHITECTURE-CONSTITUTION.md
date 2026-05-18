# 아키텍처 원칙

## 1. 레이어 분리

- **View**: UI 렌더링과 사용자 이벤트 처리만 담당
- **Service**: 외부 API 및 Supabase 호출 담당
- **Store**: 전역 상태 관리 (Context API 기반)
- View는 Service를 직접 호출하고, Store의 상태를 구독한다

## 2. 단방향 의존성

```
View → Service → Supabase / 외부 API
View → Store
```

- Service는 View나 Store를 참조하지 않는다
- Store는 Service를 호출할 수 있으나 View를 참조하지 않는다

## 3. 타입 안전성

- 모든 외부 데이터(API 응답, DB 결과)는 TypeScript 타입으로 정의한다
- `any` 사용 금지

## 4. 컴포넌트 분류

- `views/`: 라우트에 대응하는 페이지 단위 컴포넌트
- `components/`: 재사용 가능한 UI 컴포넌트
- `layouts/`: 페이지 공통 레이아웃

## 5. 상태 범위

- 로컬 상태: `useState` — 단일 컴포넌트에서만 사용되는 상태
- 전역 상태: Context (Store) — 여러 컴포넌트에서 공유되는 상태
- 서버 상태: Service 함수 직접 호출 — 별도 캐싱 레이어 없음
