import type { Metadata } from 'next'
import { sourceSerif4 } from '@/lib/fonts'
import './globals.css'
import Topbar from './components/Topbar'

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME + ' - ' + process.env.NEXT_PUBLIC_APP_DESC,
    description: 'Platform untuk menulis dan membaca Novel secara gratis.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={ sourceSerif4.className }>
                <Topbar />
                { children }
            </body>
        </html>
    )
}
