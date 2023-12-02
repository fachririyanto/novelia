'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from './schema'
import { getUploadUrl } from '@/lib/functions'
import { updateProfile } from './actions/updateProfile'
import { uploadPhoto } from './actions/uploadPhoto'
import { deletePhoto } from './actions/deletePhoto'
import { getErrorMessage } from '@/lib/error-handling'
import { roboto } from '@/lib/fonts'

import {
    Alert,
    Button,
    Textbox,
    ErrorMessage,
    ImageCover,
    Spinner,
} from '@/components'

interface FormUbahProfilProps {
    username?: string | null,
    oldUsername?: string | null,
    full_name?: string | null,
    photo?: string | null,
}

export function FormUbahProfil({ username, full_name, photo }: FormUbahProfilProps) {
    const [image, setImage] = useState<{
        url: string,
        file: File | null,
    }>({
        url: photo === '' ? '' : getUploadUrl(photo || ''),
        file: null,
    })

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
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: username || '',
            oldUsername: username || '',
            fullname: full_name || '',
            photo: image.url || '',
        },
        mode: 'onSubmit',
    })

    // handle change photo
    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) {
            return
        }

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            setImage({
                url: reader.result as string,
                file: file,
            })
        }
    }

    // handle remove photo
    const handleRemovePhoto = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setImage({
            url: '',
            file: null,
        })
    }

    // handle submit
    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
        if (loading) {
            return
        }

        setLoading(true)

        try {
            // if not change photo
            if (image.url === photo) {
                await updateProfile(data)

                setMessage({
                    type: 'success',
                    text: 'Berhasil mengubah profil.',
                })

                setLoading(false)

                return
            }

            // upload new photo
            if (image.file !== null) {
                const uploadPhotoResult = await uploadPhoto(image.file)

                await updateProfile({
                    ...data,
                    photo: uploadPhotoResult,
                })
            }

            // delete old photo
            else {
                await updateProfile({
                    ...data,
                    photo: '',
                })

                if (photo !== '') {
                    await deletePhoto(photo)
                }
            }

            setMessage({
                type: 'success',
                text: 'Berhasil mengubah profil.',
            })

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
        <form className={ `mt-10 ${roboto.className}` } onSubmit={ handleSubmit(onSubmit) }>
            { message.type !== '' && (
                <div className="mb-4">
                    <Alert variant={ message.type } message={ message.text } />
                </div>
            ) }

            <div className="mb-10">
                <div className="relative mx-auto w-[150px]">
                    <ImageCover className="rounded-full" src={ image.url } widthRatio={ 1 } heightRatio={ 1 } bgDefault="#ababab" />
                    { image.url === '' ?
                        <a href="#" className="flex absolute inset-0 z-10 font-semibold items-center justify-center uppercase text-sm text-white">Upload Foto</a> :
                        <a href="#" className="flex absolute inset-0 z-10 pb-8 font-semibold items-end justify-center uppercase text-sm text-white bg-[rgba(0,0,0,.3)] rounded-full">Ubah Foto</a>
                    }
                    <input type="file" name="photo" id="photo" onChange={ handleChangePhoto } className="absolute inset-0 z-20 cursor-pointer opacity-0" />
                </div>

                { image.url === '' ? null : (
                    <a href="#" onClick={ handleRemovePhoto } className="block mt-4 font-semibold text-sm text-center text-red-500 uppercase">Hapus Foto</a>
                ) }
            </div>

            <div className="mb-6">
                <label htmlFor="username" className="block mb-1 font-semibold text-sm text-app-font-gray uppercase">Username</label>
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

                { errors.fullname && (
                    ErrorMessage({ message: errors.fullname.message || 'Username harus diisi' })
                ) }
            </div>

            <div className="mb-6">
                <label htmlFor="fullname" className="block mb-1 font-semibold text-sm text-app-font-gray uppercase">Full Name</label>
                <Controller
                    control={ control }
                    name="fullname"
                    rules={{ required: true }}
                    render={ ({ field }) => (
                        <Textbox
                            type="fullname"
                            placeholder="Nama Lengkap"
                            { ...field }
                            />
                    ) }
                    />

                { errors.fullname && (
                    ErrorMessage({ message: errors.fullname.message || 'Nama lengkap harus diisi' })
                ) }
            </div>
            <div>
                <Button alias="button" type="submit" variant="primary" className="flex gap-3 w-full">
                    {
                        loading ? (
                            <Spinner width={ 24 } bgColor="#fff" color="#00A9FF" />
                        ) : ''
                    }
                    Ubah Profil
                </Button>
            </div>
        </form>
    )
}