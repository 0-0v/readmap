## DOMAIN-MEMBER-CONSTITUTION

### 목적
회원 도메인은 사용자 인증(Authentication)과 신원(Identity)을 관리한다.

### 원칙
- 인증 제공자는 Supabase Auth를 사용한다
- 이메일/비밀번호 방식으로 인증한다
- 인증 상태는 Supabase 세션으로 관리한다
- 비인증 사용자는 /auth 로 리다이렉트한다
- 인증 성공 후에는 / 로 리다이렉트한다
