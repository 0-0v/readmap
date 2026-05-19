import { supabase } from '@/lib/supabase'

export interface Profile {
  id: string
  avatar_index: number
  map_pin_color: string
  map_fill_color: string
}

export async function getProfile(): Promise<Profile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .single()
  return data ?? null
}

export async function updateProfile(patch: Partial<Omit<Profile, 'id'>>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('profiles')
    .upsert({ id: user.id, ...patch, updated_at: new Date().toISOString() })
}
