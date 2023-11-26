'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textbox } from '@/components/Form'
import { Button } from '@/components/Button'
import { initialFormFields, FormSchema } from './types'
import { createUser } from './actions'

export default function FormRegister() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialFormFields,
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
        try {
            const result = await createUser(data)
            console.log(result)

            // clear form
            reset()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="mt-10" onSubmit={ handleSubmit(onSubmit) }>
            <div className="mb-4">
                <Controller
                    control={ control }
                    name="email"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="email"
                            placeholder="Email"
                            { ...field }
                            />
                    ) }
                    />

                { errors.email && (
                    FormErrorMessage({ message: errors.email.message || 'Email is required' })
                ) }
            </div>
            <div className="mb-4">
                <Controller
                    control={ control }
                    name="username"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="username"
                            placeholder="Username"
                            { ...field }
                            />
                    ) }
                    />

                { errors.username && (
                    FormErrorMessage({ message: errors.username.message || 'Username is required' })
                ) }
            </div>
            <div className="mb-4">
                <Controller
                    control={ control }
                    name="fullname"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="fullname"
                            placeholder="Full Name"
                            { ...field }
                            />
                    ) }
                    />

                { errors.fullname && (
                    FormErrorMessage({ message: errors.fullname.message || 'Full Name is required' })
                ) }
            </div>
            <div className="mb-4">
                <Controller
                    control={ control }
                    name="password"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="password"
                            placeholder="Password"
                            { ...field }
                            />
                    ) }
                    />

                { errors.password && (
                    FormErrorMessage({ message: errors.password.message || 'Password is required' })
                ) }
            </div>
            <div className="mb-6">
                <Controller
                    control={ control }
                    name="confirmPassword"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="password"
                            placeholder="Confirm Password"
                            { ...field }
                            />
                    ) }
                    />

                { errors.confirmPassword && (
                    FormErrorMessage({ message: errors.confirmPassword.message || 'Confirm Password is required' })
                ) }
            </div>
            <div>
                <Button type="submit">
                    Register
                </Button>
            </div>
        </form>
    )
}

function FormErrorMessage({ message }: { message: string }) {
    return (
        <p className="mt-1 text-sm text-red-500 text-left">
            { message }
        </p>
    )
}