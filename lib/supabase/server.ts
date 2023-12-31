'use server'

import { createServerClient, CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export async function createSupabaseServerClient() {
    const cookieStore = cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },

                set(name: string, value: string, option: CookieOptions) {
                    cookieStore.set({ name, value, ...option })
                },

                remove(name: string, option: CookieOptions) {
                    cookieStore.set({ name, value: '', ...option })
                },
            },
        }
    )
}
