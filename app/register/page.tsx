import FormRegister from './Form'

export default function RegisterPage() {
    return (
        <section className="flex fixed inset-0 items-center justify-center">
            <div className="container">
                <div className="mx-auto max-w-[340px] text-center">
                    <h1 className="text-4xl font-medium">
                        Register
                    </h1>
                    <FormRegister />
                </div>
            </div>
        </section>
    )
}