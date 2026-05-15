## DOMAIN-MEMBER-STATUTE

### 라우트
- 인증 페이지: /auth (로그인/회원가입 탭 전환)

### 클라이언트
- 브라우저 환경: createClient() from @/lib/supabase
- 서버 환경(Server Action 등): @supabase/ssr의 createServerClient 사용

### 흐름
- 로그인: signInWithPassword → 성공 시 / 로 이동
- 회원가입: signUp → 성공 시 이메일 확인 안내 메시지 표시
- 에러: Supabase 반환 메시지를 폼 하단에 표시

### 컴포넌트
- src/app/auth/page.tsx : 로그인/회원가입 통합 페이지 (Client Component)
