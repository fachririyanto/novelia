import { supabase } from '@/lib/supabase/client'

// upload photo
export async function uploadPhoto(file: File) {
    // check session
    const session = await supabase.auth.getSession()

    if (!session) {
        throw new Error('User not logged in')
    }

    // setup filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${session.data.session?.user.id}.${fileExt}`

    // upload photo
    const { error } = await supabase.storage
        .from('nvl_media')
        .upload(`users/${fileName}`, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/*',
        })

    if (error) {
        throw error
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/nvl_media/users/${fileName}`
}