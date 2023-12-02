'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialFormFields, FormSchema } from './schema'
import { createUser } from './actions'
import { getErrorMessage } from '@/lib/error-handling'

import {
    Alert,
    Button,
    Textbox,
    ErrorMessage,
    Spinner,
} from '@/components'

export default function FormRegister() {
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<{
        type: string,
        text: string,
    }>({
        type: '',
        text: '',
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialFormFields,
        mode: 'onSubmit',
    })

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
        if (loading) {
            return
        }

        setLoading(true)

        try {
            const result = await createUser(data)

            if (result) {
                setMessage({
                    type: 'success',
                    text: 'Berhasil mendaftar. Silahkan cek email untuk verifikasi.',
                })
            }

            // clear form
            reset()
            setLoading(false)
        } catch (error) {
            setMessage({
                type: 'error',
                text: getErrorMessage(error),
            })

            setLoading(false)
        }
    }

    return (
        <form className="mt-10" onSubmit={ handleSubmit(onSubmit) }>
            { message.type !== '' && (
                <div className="mb-4">
                    <Alert variant={ message.type } message={ message.text } />
                </div>
            ) }

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
                    ErrorMessage({ message: errors.email.message || 'Email is required' })
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
                    ErrorMessage({ message: errors.username.message || 'Username is required' })
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
                    ErrorMessage({ message: errors.fullname.message || 'Full Name is required' })
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
                    ErrorMessage({ message: errors.password.message || 'Password is required' })
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
                    ErrorMessage({ message: errors.confirmPassword.message || 'Confirm Password is required' })
                ) }
            </div>
            <div>
                <Button alias="button" type="submit" variant="primary" className="flex gap-3 w-full">
                    {
                        loading ? (
                            <Spinner width={ 24 } bgColor="#fff" color="#00A9FF" />
                        ) : ''
                    }
                    Register
                </Button>
            </div>
            <div className="mt-6 text-sm text-center">
                Atau <Link href="/login" className="font-semibold border-b border-black">masuk</Link> jika sudah punya akun.
            </div>
        </form>
    )
}