import * as z from 'zod'

export const FormSchema = z.object({
    email: z.string().min(1, {
        message: 'Email required.',
    }).email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long',
    }),
})

export const initialFormFields: z.infer<typeof FormSchema> = {
    email: '',
    password: '',
}