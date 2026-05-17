export interface KakaoBook {
  title: string
  authors: string[]
  publisher: string
  isbn: string
  thumbnail: string
  contents: string
  datetime: string
  translators: string[]
  url: string
}

export const searchKakaoBooks = async (query: string): Promise<KakaoBook[]> => {
  if (!query.trim()) return []
  const res = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=20`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.documents as KakaoBook[]
}
