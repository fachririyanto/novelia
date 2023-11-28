import { redirect } from 'next/navigation'
import { logout } from '@/lib/actions'
import { Button } from '../Button'

export function ButtonLogout() {
    const handleLogout = async () => {
        'use server'
        await logout()
        redirect('/login')
    }

    return (
        <form action={ handleLogout }>
            <Button
                alias="button"
                type="submit"
                variant="primary"
                className="inline-flex rounded-[40px] bg-app-primary text-white"
            >
                Logout
            </Button>
        </form>
    )
}