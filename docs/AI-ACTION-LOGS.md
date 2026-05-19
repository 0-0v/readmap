# AI 작업 로그

## 2026-05-19

- Vercel CLI 배포 설정 (`vercel --prod`)
- `vercel.json` SPA 라우팅 rewrites 추가
- 카카오 로그인 redirect URI 문제 디버깅 및 해결 가이드 제공
- `README.md` 전면 재작성 (Next.js 템플릿 → 실제 프로젝트 내용)
- `docs/ARCHITECTURE-CONSTITUTION.md` 작성
- `docs/ARCHITECTURE-STATUTE.md` 작성
- `docs/DOMAIN-COMMON-CONSTITUTION.md` 작성
- `docs/DOMAIN-COMMON-STATUTE.md` 작성
- `docs/DOMAIN-MEMBER-CONSTITUTION.md` 수정 (잘못된 라우트 /auth → /login, /signup)
- `docs/DOMAIN-MEMBER-STATUTE.md` 수정
- `docs/DOMAIN-BOOK-CONSTITUTION.md` 신규 작성
- `docs/DOMAIN-BOOK-STATUTE.md` 신규 작성
- `docs/DOMAIN-MAP-CONSTITUTION.md` 신규 작성
- `docs/DOMAIN-MAP-STATUTE.md` 신규 작성
- `docs/AI-MAJOR-EVENT.md`, `AI-MAJOR-EVENT-RECAP.md` 작성
- develop ↔ staging 브랜치 동기화

## 2026-05-15

- Supabase 클라이언트 설정 (`src/lib/supabase.ts`)
- 로그인/회원가입 페이지 구현 (이메일 + 카카오 OAuth)
- 세계지도 컴포넌트 구현 (`react-simple-maps`)
- 책 등록 페이지 UI 구현
- 메인 페이지 UI 구현 (세계지도 + 통계바 + 사이드패널)
- ReadMap 디자인 시스템 적용 (CSS 토큰, Pretendard, 라이트/다크 테마)
