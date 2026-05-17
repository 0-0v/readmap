export interface Book {
  id: string
  title: string
  author: string
  country: string
  countryCode: string
  coverUrl: string // Keeping for compatibility, but we'll use colors
  coverColor: string
  coverTextColor?: string
  year: number
  dateRead: string
  note: string
  rating: number
  pageCount: number
  tags?: string[]
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '연금술사',
    author: '파울로 코엘료',
    country: '프랑스',
    countryCode: 'FRA',
    coverUrl: '',
    coverColor: '#C49A6C',
    year: 1988,
    dateRead: '2026-03-12',
    note: '자아의 신화를 찾아 떠나는 양치기 산티아고의 여행기.',
    rating: 4.5,
    pageCount: 220,
    tags: ['소설', '판타지', '베스트셀러'],
  },
  {
    id: '2',
    title: '잃어버린 시간을 찾아서',
    author: '마르셀 프루스트',
    country: '프랑스',
    countryCode: 'FRA',
    coverUrl: '',
    coverColor: '#4A657A',
    year: 1913,
    dateRead: '2026-02-08',
    note: '기억과 시간에 대한 방대한 성찰.',
    rating: 4.0,
    pageCount: 580,
    tags: ['소설', '고전문학'],
  },
  {
    id: '3',
    title: '이방인',
    author: '알베르 카뮈',
    country: '프랑스',
    countryCode: 'FRA',
    coverUrl: '',
    coverColor: '#2C3545',
    year: 1942,
    dateRead: '2026-01-24',
    note: '부조리한 세상 속 인간의 소외.',
    rating: 5.0,
    pageCount: 184,
    tags: ['소설', '실존주의'],
  },
  {
    id: '4',
    title: '레 미제라블',
    author: '빅토르 위고',
    country: '프랑스',
    countryCode: 'FRA',
    coverUrl: '',
    coverColor: '#7A3B3B',
    year: 1862,
    dateRead: '2025-12-30',
    note: '인간의 구원과 사랑에 대한 대서사시.',
    rating: 4.5,
    pageCount: 1200,
    tags: ['소설', '역사'],
  },
  {
    id: '5',
    title: '어린 왕자',
    author: '앙투안 드 생텍쥐페리',
    country: '프랑스',
    countryCode: 'FRA',
    coverUrl: '',
    coverColor: '#D4B886',
    year: 1943,
    dateRead: '2025-11-18',
    note: '어른들을 위한 동화.',
    rating: 5.0,
    pageCount: 96,
    tags: ['소설', '동화'],
  },
  {
    id: '6',
    title: '브라질, 사랑과 슬픔의 사이',
    author: '조르지 아마두',
    country: '브라질',
    countryCode: 'BRA',
    coverUrl: '',
    coverColor: '#8B3A3A',
    year: 1990,
    dateRead: '2025-10-10',
    note: '',
    rating: 4.0,
    pageCount: 320,
    tags: ['소설', '라틴아메리카'],
  },
  {
    id: '7',
    title: '백 년 동안의 고독',
    author: '가브리엘 가르시아 마르케스',
    country: '콜롬비아',
    countryCode: 'COL',
    coverUrl: '',
    coverColor: '#A05A3C',
    year: 1967,
    dateRead: '2025-09-15',
    note: '',
    rating: 5.0,
    pageCount: 450,
    tags: ['소설', '마술적 리얼리즘'],
  },
  {
    id: '8',
    title: '위대한 개츠비',
    author: 'F. 스콧 피츠제럴드',
    country: '미국',
    countryCode: 'USA',
    coverUrl: '',
    coverColor: '#2F4F4F',
    year: 1925,
    dateRead: '2025-08-20',
    note: '',
    rating: 4.5,
    pageCount: 200,
    tags: ['소설', '영미문학'],
  },
]

export const searchableBooks: Book[] = [...mockBooks]

export const countryStats = {
  totalCountries: 16,
  totalContinents: 5,
  totalBooks: 52,
  yearlyAdded: 18,
}
