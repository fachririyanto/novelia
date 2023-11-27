'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { FormSchema } from '../schema'

export async function createUser(formData: z.infer<typeof FormSchema>) {
    const supabase = await createSupabaseServerClient()

    // save new user
    const saveNewUser = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    })

    if (saveNewUser.error) {
        throw saveNewUser.error
    }

    // save user profile
    const saveProfile = await supabase.from('nvl_profiles').insert({
        user_id: saveNewUser.data.user?.id,
        username: formData.username,
        full_name: formData.fullname,
        photo: '',
    })

    if (saveProfile.error) {
        // delete user
        await supabase.auth.admin.deleteUser(saveNewUser.data.user?.id as string)

        throw saveProfile.error
    }

    return saveNewUser.data
}