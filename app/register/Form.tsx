'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialFormFields, FormSchema } from './schema'
import { createUser } from './actions'
import { getErrorMessage } from '@/lib/error-handling'

import { Textbox } from '@/components/Form'
import { Button } from '@/components/Button'
import { Alert } from '@/components/Alert'
import { Spinner } from '@/components/Spinner'

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
        mode: 'onChange',
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
                <Button type="submit" className="flex gap-3 w-full rounded-[40px] bg-app-primary text-white">
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

function FormErrorMessage({ message }: { message: string }) {
    return (
        <p className="mt-1 text-sm text-red-500 text-left">
            { message }
        </p>
    )
}