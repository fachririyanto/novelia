import Link from 'next/link'
import { Textbox } from '@/components/Form'
import { Button } from '@/components/Button'

export default function LoginPage() {
    return (
        <section className="flex fixed inset-0 items-center justify-center">
            <div className="container">
                <div className="mx-auto max-w-[340px] text-center">
                    <h1 className="text-4xl font-medium">
                        Masuk
                    </h1>
                    <form className="mt-10">
                        <div className="mb-4">
                            <Textbox placeholder="Email" type="email" />
                        </div>
                        <div className="mb-6">
                            <Textbox placeholder="Password" type="password" />
                        </div>
                        <div>
                            <Button type="submit" className="flex gap-3 w-full rounded-[40px] bg-app-primary text-white">
                                Login
                            </Button>
                        </div>
                        <div className="mt-6 text-sm text-center">
                            Atau <Link href="/register" className="font-semibold border-b border-black">daftar</Link> jika belum punya akun.
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}