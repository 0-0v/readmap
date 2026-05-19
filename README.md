# ReadMap

읽은 책의 배경 국가를 세계지도에 기록하는 독서 트래킹 서비스

**배포 URL**: https://readmap-three.vercel.app

---

# 프로젝트 개요

- **목적**: 사용자가 읽은 책의 배경 국가를 기록하고, 이를 세계지도 위에 시각화하여 독서 경험을 더 직관적으로 관리할 수 있도록 하는 서비스
- **해결하는 문제**: 독서 이력을 지도로 시각화해 어느 나라의 책을 얼마나 읽었는지 한눈에 파악
- **배경**: 독서 기록 앱은 많지만, 국가별 독서 분포를 시각화하는 서비스는 없다는 아이디어에서 시작

---

# 기술 스택

## Frontend

- React 19 / TypeScript
- Vite
- Tailwind CSS v4, shadcn/ui, Framer Motion
- React Router v7

## Backend

- Supabase (Auth, Database)

## 외부 API

- 카카오 도서 검색 API

## AI Agent

- Claude Code

---

# 주요 기능

- **세계지도 시각화**: 책을 등록한 나라가 지도에 색상으로 표시되며, 클릭 시 해당 나라의 독서 목록 확인 가능
- **카카오 도서 검색**: 책 제목으로 검색하면 카카오 API에서 책 정보(표지, 저자, 출판사)를 자동으로 가져옴
- **독서 기록**: 별점, 독서 기간, 원산지 국가, 메모를 함께 저장
- **인증**: 이메일 회원가입 및 카카오 소셜 로그인 지원
- **라이트 / 다크 테마**

---

# 프로젝트 구조

```text
src/
├── assets/         # 이미지 등 정적 리소스
├── components/
│   ├── book/       # 책 관련 UI 컴포넌트
│   ├── map/        # 세계지도 관련 컴포넌트
│   └── ui/         # 공통 UI 컴포넌트
├── hooks/          # 커스텀 훅
├── layouts/        # 레이아웃
├── lib/            # 외부 라이브러리 초기화
├── services/       # API 호출 (Supabase, 카카오)
├── stores/         # 전역 상태 (Auth, Toast)
├── types/          # TypeScript 타입 정의
├── utils/          # 유틸리티 함수
└── views/          # 페이지 컴포넌트
```

---

# 실행 방법

## 1. 프로젝트 설치

```bash
pnpm install
```

## 2. 환경변수 설정

`.env.local`

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_KAKAO_REST_API_KEY=
```

## 3. 실행

```bash
pnpm dev
```

---

# Supabase 설정

## Authentication

- 이메일/비밀번호 로그인
- 카카오 OAuth (Social Provider)

## 테이블

### `books`

| 컬럼         | 타입        | 설명                        |
| ------------ | ----------- | --------------------------- |
| id           | uuid        | PK                          |
| user_id      | uuid        | 사용자 ID (auth.users 참조) |
| title        | text        | 책 제목                     |
| authors      | text[]      | 저자 목록                   |
| publisher    | text        | 출판사                      |
| thumbnail    | text        | 표지 이미지 URL             |
| isbn         | text        | ISBN                        |
| country      | text        | 원산지 국가명               |
| country_code | text        | 국가 코드                   |
| rating       | int         | 별점                        |
| start_date   | date        | 독서 시작일                 |
| end_date     | date        | 독서 종료일                 |
| note         | text        | 메모                        |
| created_at   | timestamptz | 등록일                      |

### `profiles`

| 컬럼           | 타입        | 설명                 |
| -------------- | ----------- | -------------------- |
| id             | uuid        | PK (auth.users 참조) |
| avatar_index   | int         | 아바타 이미지 인덱스 |
| map_pin_color  | text        | 지도 핀 색상         |
| map_fill_color | text        | 지도 채우기 색상     |
| updated_at     | timestamptz | 수정일               |

## RLS

- `books`: 본인 데이터만 SELECT / INSERT / UPDATE / DELETE 가능
- `profiles`: 본인 데이터만 SELECT / UPSERT 가능

---

# AI 에이전트 활용 방식

## 사용 도구

- Claude Code (CLI)

## 어떤 작업에 활용했는지

- 컴포넌트 생성 및 리팩터링
- Supabase 서비스 레이어 구현
- 버그 수정
- Vercel 배포 설정
- 문서 작성 (README, 아키텍처 문서)

## 문서 기반 작업 방식

- `CLAUDE.md`에 아키텍처 원칙과 문서 규칙을 정의하고 AI가 이를 기준으로 작업
- `docs/` 폴더에 도메인별 원칙/규칙 문서를 유지하며 컨텍스트로 활용
- 작업 범위를 명확히 지시하고 범위 외 기능 추가를 금지

---

# 트러블 슈팅

## 카카오 로그인 후 localhost로 리다이렉트되는 문제

### 문제 상황

Vercel 배포 후 카카오 로그인 시 `localhost:3000`으로 리다이렉트되어 로그인 실패

### 원인

Supabase 콘솔의 Site URL과 카카오 개발자 콘솔의 Redirect URI가 `localhost:3000`으로만 설정되어 있었음

### 해결 방법

1. Supabase → Authentication → URL Configuration에서 Site URL을 Vercel 도메인으로 변경
2. Redirect URLs에 `https://readmap-three.vercel.app/**` 추가
3. 카카오 개발자 콘솔 → 카카오 로그인 → Redirect URI에 Vercel 도메인 추가

---

# 회고

- 어려웠던 점: 단순히 기능을 구현하는 것보다, 사용자가 실제로 어떤 흐름으로 서비스를 사용할지 고민하며 상세 기획을 구체화하는 과정이 가장 어려웠습니다.
  특히 “독서를 지도에 기록한다”는 컨셉을 어떻게 자연스럽게 사용자 경험으로 연결할지 많은 고민이 필요했습니다.
- 개선하고 싶은 점: 전체적인 기능 구현은 완료했지만, 아직 사용자 입장에서 섬세한 UX 요소가 부족하다고 느꼈습니다.
- 새롭게 배운 점: 이번 프로젝트를 통해 바이브 코딩(Vibe Coding) 방식의 개발 경험을 할 수 있었습니다.
  빠르게 아이디어를 구현하고 흐름 중심으로 개발을 진행하면서, 완벽한 설계 이전에도 MVP 형태로 서비스를 만들어보는 경험의 중요성을 배웠습니다.
- AI 에이전트를 사용하며 느낀 점: AI 에이전트는 반복 작업이나 구조 설계, 아이디어 확장 측면에서는 매우 뛰어났습니다.
  하지만 사용자 의도나 세부 맥락까지 완벽하게 이해하지는 못해, 결국 최종적인 판단과 방향성은 개발자가 직접 잡아야 한다는 점을 느꼈습니다.
  그래서 AI를 “대체자”보다는 생산성을 높여주는 협업 도구에 가깝게 바라보게 되었습니다.

---

# 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [react-simple-maps](https://www.react-simple-maps.io/)
- [카카오 도서 검색 API](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel 배포 문서](https://vercel.com/docs)
