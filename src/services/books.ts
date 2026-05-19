import { supabase } from '@/lib/supabase'
import { KakaoBook } from './kakaoBooks'
import { UserBook } from '@/types/book'

interface SaveBookMeta {
  rating: number
  startDate: string
  endDate: string
  note: string
  country: string
  countryCode: string
}

export const saveBook = async (kakaoBook: KakaoBook, meta: SaveBookMeta) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다')

  return supabase.from('books').insert({
    user_id: user.id,
    title: kakaoBook.title,
    authors: kakaoBook.authors,
    publisher: kakaoBook.publisher,
    thumbnail: kakaoBook.thumbnail,
    isbn: kakaoBook.isbn,
    country: meta.country,
    country_code: meta.countryCode,
    rating: meta.rating,
    start_date: meta.startDate || null,
    end_date: meta.endDate || null,
    note: meta.note,
  })
}

export const updateBook = async (
  id: string,
  patch: { rating?: number; country?: string; country_code?: string; start_date?: string | null; end_date?: string | null; note?: string }
) => {
  const { error } = await supabase.from('books').update(patch).eq('id', id)
  if (error) throw error
}

export const deleteBook = async (id: string) => {
  const { error } = await supabase.from('books').delete().eq('id', id)
  if (error) throw error
}

export const getUserBooks = async (): Promise<UserBook[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as UserBook[]
}
