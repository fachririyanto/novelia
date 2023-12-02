'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { FormSchema } from '../schema'
import { getSession } from '@/lib/actions'

// update profile
export async function updateProfile(formData: z.infer<typeof FormSchema>) {
    // check session
    const session = await getSession()

    if (!session) {
        throw new Error('User not logged in')
    }

    // check username availability
    const supabase = await createSupabaseServerClient()

    const findUsername = await supabase
        .from('nvl_profiles')
        .select('username')
        .eq('username', formData.username)
        .neq('username', formData.oldUsername)
        .single()

    if (findUsername.data) {
        throw new Error('Username already taken')
    }

    console.log('formData', formData)

    // update profile
    const { data, error } = await supabase
        .from('nvl_profiles')
        .update({
            username: formData.username,
            full_name: formData.fullname,
            photo: formData.photo,
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)

    if (error) {
        throw error
    }

    return data
}