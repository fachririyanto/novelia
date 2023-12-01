import type { Metadata } from 'next'
import { getUserProfile } from '@/lib/actions'
import { FormUbahProfil } from './Form'

export const metadata: Metadata = {
    title: 'Ubah Profil - ' + process.env.NEXT_PUBLIC_APP_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESC,
}

export default async function Page() {
    const profile = await getUserProfile()

    return (
        <section className="py-20">
            <div className="container">
                <div className="mx-auto max-w-[340px] text-center">
                    <h1 className="text-4xl font-semibold leading-tight">
                        Ubah Profil
                    </h1>
                    <FormUbahProfil { ...profile } />
                </div>
            </div>
        </section>
    )
}