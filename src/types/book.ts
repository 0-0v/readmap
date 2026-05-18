export interface UserBook {
  id: string
  user_id: string
  title: string
  authors: string[]
  publisher: string
  thumbnail: string
  isbn: string
  country: string
  country_code: string
  rating: number
  start_date: string | null
  end_date: string | null
  note: string
  created_at: string
}
