# 아키텍처 구현 규칙

## 디렉토리 구조

```
src/
├── assets/         # 정적 리소스 (이미지 등)
├── components/
│   ├── book/       # 책 도메인 UI 컴포넌트
│   ├── map/        # 지도 도메인 UI 컴포넌트
│   └── ui/         # 도메인 무관 공통 컴포넌트
├── constants/      # 상수 정의
├── hooks/          # 커스텀 훅
├── layouts/        # 레이아웃 컴포넌트
├── lib/            # 외부 라이브러리 초기화 (supabase 클라이언트 등)
├── services/       # API 호출 함수
├── stores/         # 전역 상태 (Context + Provider)
├── styles/         # 전역 CSS
├── types/          # 공유 타입 정의
├── utils/          # 순수 유틸리티 함수
└── views/          # 페이지 컴포넌트
```

## 파일 네이밍

- 컴포넌트: PascalCase (`BookCard.tsx`)
- 훅: camelCase, `use` 접두사 (`useMapColors.ts`)
- 서비스: camelCase (`kakaoBooks.ts`)
- 타입: camelCase (`book.ts`)

## 라우팅 규칙

| 경로 | 컴포넌트 | 가드 |
|------|----------|------|
| `/` | MainMap | 없음 |
| `/login` | Login | GuestRoute |
| `/signup` | Signup | GuestRoute |
| `/add` | AddBook | ProtectedRoute |
| `/library` | Library | ProtectedRoute |

- `GuestRoute`: 로그인 상태면 `/`로 리다이렉트
- `ProtectedRoute`: 비로그인 상태면 `/login`으로 리다이렉트

## 환경변수

- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VITE_KAKAO_REST_API_KEY`: 카카오 REST API 키
- 모든 환경변수는 `VITE_` 접두사를 사용한다 (Vite 클라이언트 노출 규칙)

## 인증 흐름

1. Supabase Auth 사용 (이메일 / 카카오 OAuth)
2. 카카오 OAuth redirect URI: `window.location.origin/`
3. 세션은 `authStore`에서 관리, `onAuthStateChange`로 실시간 구독
4. Supabase 클라이언트는 `src/lib/supabase.ts` 단일 인스턴스 사용

## 스타일링

- Tailwind CSS v4 사용
- CSS 커스텀 토큰으로 디자인 시스템 정의 (`src/styles/global.css`)
- 다크/라이트 테마: `ThemeToggle` 컴포넌트로 전환
- 컴포넌트 variants: `class-variance-authority` 사용
