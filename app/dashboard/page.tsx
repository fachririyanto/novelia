import { getUserProfile } from '@/lib/actions'
import { ButtonLogout } from '@/components/ButtonLogout'

export default async function DashboardPage() {
    const profile = await getUserProfile()

    return (
        <section className="py-20">
            <div className="container">
                <h1 className="text-5xl font-semibold leading-tight">
                    Dashboard
                </h1>
                <p className="mt-2 text-gray-500">
                    Welcome back, { profile?.full_name }
                </p>
                <div className="mt-4">
                    <ButtonLogout />
                </div>
            </div>
        </section>
    )
}