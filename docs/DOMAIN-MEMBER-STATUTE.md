# 회원 도메인 규칙

## 라우트

| 경로 | 컴포넌트 | 가드 |
|------|----------|------|
| `/login` | Login | GuestRoute (로그인 상태 → `/`로 이동) |
| `/signup` | Signup | GuestRoute (로그인 상태 → `/`로 이동) |

## 인증 흐름

- **이메일 로그인**: `signInWithPassword` → 성공 시 `/`로 이동
- **이메일 회원가입**: `signUp` → 성공 시 `/`로 이동
- **카카오 로그인**: `signInWithOAuth` → 카카오 인증 후 `window.location.origin/`로 리다이렉트
- **로그아웃**: `signOut` → 세션 만료, `/`로 이동

## 세션 관리

- `authStore` (Context API)에서 `onAuthStateChange`로 세션 실시간 구독
- 앱 최초 로드 시 `getSession()`으로 기존 세션 복원
- `useAuth()` 훅으로 컴포넌트에서 세션 접근

## 프로필

- 테이블: `profiles`
- 사용자당 1개 (id = auth.users.id)
- 서비스: `src/services/profile.ts`
- 저장 항목: 아바타 인덱스, 지도 핀 색상, 지도 채우기 색상

## 컴포넌트 & 서비스

- `src/views/Login.tsx`: 로그인 페이지
- `src/views/Signup.tsx`: 회원가입 페이지
- `src/services/auth.ts`: 인증 관련 Supabase 호출
- `src/services/profile.ts`: 프로필 조회 및 수정
- `src/stores/authStore.tsx`: 전역 인증 상태
- `src/components/ui/ProtectedRoute.tsx`: 인증 필요 라우트 가드
- `src/components/ui/GuestRoute.tsx`: 게스트 전용 라우트 가드
