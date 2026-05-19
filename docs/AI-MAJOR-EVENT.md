# AI 주요 사건 및 의사결정

## 2026-05-15 | 프로젝트 초기 구조 설정

- React 19 + Vite + TypeScript 스택 선택
- Supabase Auth + Database 구성
- `books`, `profiles` 테이블 설계
- Tailwind CSS v4 + shadcn/ui 디자인 시스템 적용
- Pretendard 폰트, 라이트/다크 테마 CSS 토큰 설정

## 2026-05-15 | 아키텍처 레이어 분리 결정

- View / Service / Store 3-레이어 구조 채택
- 서버 상태 캐싱 레이어(React Query 등) 미도입 결정 — MVP 단계에서 복잡도 최소화

## 2026-05-19 | Vercel 배포 및 트러블슈팅

- Vercel CLI로 첫 배포 완료
- SPA 라우팅 문제 발견 → `vercel.json` rewrites 설정으로 해결
- 카카오 로그인 redirect URI 문제 발견 → Supabase Site URL + 카카오 개발자 콘솔 Redirect URI 설정으로 해결

## 2026-05-19 | 브랜치 전략 확정

- `develop → staging → main` 3단계 브랜치 전략 채택
- develop: 기능 개발, staging: 검증, main: 프로덕션
