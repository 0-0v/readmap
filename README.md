# ReadMap

읽은 책의 원산지 국가를 세계지도에 기록하는 독서 트래킹 서비스입니다.

**배포 URL**: https://readmap-three.vercel.app

---

## 주요 기능

- 세계지도에서 국가별로 읽은 책 시각화
- 카카오 도서 검색으로 책 등록
- 이메일 / 카카오 소셜 로그인
- 내 서재 관리 (등록, 수정, 삭제)
- 라이트 / 다크 테마

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 19, TypeScript, Vite |
| 스타일 | Tailwind CSS v4, shadcn/ui, Framer Motion |
| 라우팅 | React Router v7 |
| 백엔드 | Supabase (Auth, Database) |
| 외부 API | 카카오 도서 검색 API |
| 배포 | Vercel |

---

## 로컬 실행

### 사전 준비

- Node.js 18+
- pnpm

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
```

### 실행

```bash
pnpm install
pnpm dev
```

---

## 배포

Vercel CLI로 배포:

```bash
vercel --prod
```

Vercel 대시보드 **Settings → Environment Variables**에 위 환경변수 3개를 동일하게 추가해야 합니다.

### 카카오 로그인 설정

[카카오 개발자 콘솔](https://developers.kakao.com)에서 Redirect URI 등록:
- `https://your-domain.vercel.app/`

[Supabase 콘솔](https://supabase.com)에서 URL 설정:
- Site URL: `https://your-domain.vercel.app`
- Redirect URLs: `https://your-domain.vercel.app/**`

---

## 프로젝트 구조

```
src/
├── components/
│   ├── book/       # 책 관련 컴포넌트
│   ├── map/        # 세계지도 관련 컴포넌트
│   └── ui/         # 공통 UI 컴포넌트
├── layouts/        # 레이아웃
├── services/       # API 호출 (Supabase, 카카오)
├── stores/         # 전역 상태 (Auth, Toast)
├── types/          # TypeScript 타입 정의
├── views/          # 페이지 컴포넌트
└── hooks/          # 커스텀 훅
```

---

## 라우팅

| 경로 | 페이지 | 접근 |
|------|--------|------|
| `/` | 세계지도 메인 | 공개 |
| `/login` | 로그인 | 비로그인 전용 |
| `/signup` | 회원가입 | 비로그인 전용 |
| `/add` | 책 등록 | 로그인 필요 |
| `/library` | 내 서재 | 로그인 필요 |
