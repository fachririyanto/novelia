'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialFormFields, FormSchema } from './schema'
import { getErrorMessage } from '@/lib/error-handling'

import Link from 'next/link'
import { doLogin } from './actions'

import {
    Alert,
    Button,
    Textbox,
    ErrorMessage,
    Spinner,
} from '@/components'

export function FormLogin() {
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<{
        type: string,
        text: string,
    }>({
        type: '',
        text: '',
    })

    const router = useRouter()

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
            const result = await doLogin(data)

            // clear form
            reset()
            setLoading(false)

            // redirect to dashboard
            if (result) {
                router.push('/dashboard')
                return
            }
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
            <div className="mb-6">
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
            <div>
                <Button alias="button" type="submit" variant="primary" className="flex gap-3 w-full">
                    {
                        loading ? (
                            <Spinner width={ 24 } bgColor="#fff" color="#00A9FF" />
                        ) : ''
                    }
                    Login
                </Button>
            </div>
            <div className="mt-6 text-sm text-center">
                Atau <Link href="/register" className="font-semibold border-b border-black">daftar</Link> jika belum punya akun.
            </div>
        </form>
    )
}