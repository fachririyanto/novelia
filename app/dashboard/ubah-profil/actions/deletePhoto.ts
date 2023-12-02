'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/actions'

export async function deletePhoto(photoUrl: string | null | undefined) {
    if (!photoUrl) {
        throw new Error('Photo not found')
    }

    // check session
    const session = await getSession()

    if (!session) {
        throw new Error('User not logged in')
    }

    // delete photo
    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.storage
        .from('nvl_media')
        .remove([photoUrl])

    if (error) {
        throw error
    }

    return true
}