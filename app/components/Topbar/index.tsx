import { getSession, getUserProfile } from '@/lib/actions'
import Link from 'next/link'
import { roboto } from '@/lib/fonts'
import { AuthMenu } from './AuthMenu'

export default async function Topbar() {
    const session = await getSession()
    const profile = await getUserProfile()

    return (
        <header className="h-16">
            <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-100">
                <div className="flex px-4 h-full items-center">
                    <h1 className="flex-grow pr-6 font-semibold uppercase">
                        <Link href="/">
                            Novelia
                        </Link>
                    </h1>
                    <ul className={ `flex gap-6 uppercase text-sm font-medium items-center ${roboto.className}` }>
                        <li>
                            <Link href="/" className="hover:text-primary">Home</Link>
                        </li>
                        <li>
                            <Link href="/novel" className="hover:text-primary">Baca Novel</Link>
                        </li>

                        { session ? (
                            <AuthMenu email={ session.user.email } profile={ profile } />
                        ) : (
                            <li>
                                <Link href="/login" className="hover:text-primary">Masuk</Link>
                            </li>
                        ) }
                    </ul>
                </div>
            </nav>
        </header>
    )
}