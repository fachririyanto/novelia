import { Textbox } from '@/components/Form'
import { Button } from '@/components/Button'

export default function LoginPage() {
    return (
        <section className="flex fixed inset-0 items-center justify-center">
            <div className="container">
                <div className="mx-auto max-w-[340px] text-center">
                    <h1 className="text-4xl font-medium">
                        Login
                    </h1>
                    <form className="mt-10">
                        <div className="mb-4">
                            <Textbox placeholder="Email" type="email" />
                        </div>
                        <div className="mb-6">
                            <Textbox placeholder="Password" type="password" />
                        </div>
                        <div>
                            <Button type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}