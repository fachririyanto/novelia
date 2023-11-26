'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { FormSchema } from '../types'

export async function createUser(formData: z.infer<typeof FormSchema>) {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    })

    if (error) {
        throw error
    }

    return data
}