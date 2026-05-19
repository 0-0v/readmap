# Book 도메인 규칙

## 라우트

| 경로 | 컴포넌트 | 가드 |
|------|----------|------|
| `/add` | AddBook | ProtectedRoute |
| `/library` | Library | ProtectedRoute |

## 데이터 구조

### `books` 테이블 (Supabase)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| user_id | uuid | auth.users 참조 |
| title | text | 책 제목 |
| authors | text[] | 저자 목록 |
| publisher | text | 출판사 |
| thumbnail | text | 표지 이미지 URL |
| isbn | text | ISBN |
| country | text | 원산지 국가명 |
| country_code | text | 국가 코드 |
| rating | int | 별점 (0~5) |
| start_date | date | 독서 시작일 (nullable) |
| end_date | date | 독서 종료일 (nullable) |
| note | text | 메모 |
| created_at | timestamptz | 등록일 |

### 타입

- `UserBook`: `src/types/book.ts`
- `KakaoBook`: `src/services/kakaoBooks.ts`
- `SaveBookMeta`: `src/services/books.ts` (내부 타입)

## 카카오 도서 검색

- API: `https://dapi.kakao.com/v3/search/book`
- 인증: `Authorization: KakaoAK {VITE_KAKAO_REST_API_KEY}`
- 서비스: `src/services/kakaoBooks.ts`

## CRUD 서비스

- `saveBook(kakaoBook, meta)`: 책 등록
- `updateBook(id, patch)`: 별점, 국가, 기간, 메모 수정
- `deleteBook(id)`: 책 삭제
- `getUserBooks()`: 내 책 전체 조회 (created_at 내림차순)

## 서재 필터 / 정렬

- 검색: 제목, 저자명
- 필터: 국가, 최소 별점
- 정렬: 최근 읽은 순 / 평점 높은 순 / 제목 순

## 컴포넌트

- `src/views/AddBook.tsx`: 책 검색 및 등록 페이지
- `src/views/Library.tsx`: 내 서재 목록 페이지
- `src/components/book/BookCard.tsx`: 서재 목록 카드
- `src/components/book/BookSearchCard.tsx`: 검색 결과 카드
- `src/components/book/BookDetailPanel.tsx`: 책 등록 상세 패널
- `src/components/book/BookDetailSidePanel.tsx`: 서재 책 상세/수정/삭제 사이드 패널
- `src/components/book/LibrarySidebar.tsx`: 서재 통계 사이드바
- `src/components/book/StatsBar.tsx`: 지도 상단 독서 통계 바
- `src/components/book/CountrySelect.tsx`: 국가 선택 컴포넌트
