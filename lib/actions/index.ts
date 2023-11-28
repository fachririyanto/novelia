'use server'

import { createSupabaseServerClient } from '../supabase/server'

// get user session
export async function getSession() {
    const supabase = await createSupabaseServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        return null
    }

    return session
}

// get user profile
export async function getUserProfile() {
    const session = await getSession()

    if (!session) {
        return null
    }

    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
        .from('nvl_profiles')
        .select('username, full_name, photo')
        .eq('user_id', session.user.id)
        .single()

    if (error) {
        return null
    }

    return data
}

// logout user
export async function logout() {
    try {
        const supabase = await createSupabaseServerClient()
        await supabase.auth.signOut()
    } catch (error) {
        throw error
    }
}