'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { FormSchema } from './schema'

export async function doLogin(formData: z.infer<typeof FormSchema>) {
    const supabase = await createSupabaseServerClient()

    // save new user
    const login = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    })

    if (login.error) {
        throw login.error
    }

    return login.data
}