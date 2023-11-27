import * as z from 'zod'

export const FormSchema = z.object({
    email: z.string().min(1, {
        message: 'Email required.',
    }).email({
        message: 'Please enter a valid email address',
    }),
    username: z.string().min(1, {
        message: 'Username is required',
    }),
    fullname: z.string().min(1, {
        message: 'Fullname is required',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, {
        message: 'Confirmation password must be at least 8 characters long',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export const initialFormFields: z.infer<typeof FormSchema> = {
    email: '',
    username: '',
    fullname: '',
    password: '',
    confirmPassword: '',
}