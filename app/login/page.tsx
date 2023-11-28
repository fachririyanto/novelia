import { FormLogin } from './Form'

export default function LoginPage() {
    return (
        <section className="flex absolute inset-0 items-center justify-center">
            <div className="container">
                <div className="mx-auto max-w-[340px] text-center">
                    <h1 className="text-4xl font-medium">
                        Masuk
                    </h1>
                    <FormLogin />
                </div>
            </div>
        </section>
    )
}