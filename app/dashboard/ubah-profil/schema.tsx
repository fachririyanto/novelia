import * as z from 'zod'

export const FormSchema = z.object({
    username: z.string().min(1, { message: 'Username harus diisi' }),
    oldUsername: z.string().min(1, { message: 'Old username harus diisi' }),
    fullname: z.string().min(1, { message: 'Nama lengkap harus diisi' }),
    photo: z.string().optional(),
})