import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from './lib/supabase/database.types'

export async function middleware(req: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })

    const options: CookieOptions = {
        cookies: {
            get(name: string) {
                return req.cookies.get(name)?.value
            },
            set(name: string, value: string, options?: CookieOptions) {
                req.cookies.set({ name, value, ...options })

                response = NextResponse.next({
                    request: {
                        headers: req.headers,
                    },
                })

                response.cookies.set({ name, value, ...options })
            },
            remove(name: string, options?: CookieOptions) {
                req.cookies.set({ name, value: '', ...options })

                response = NextResponse.next({
                    request: {
                        headers: req.headers,
                    },
                })

                response.cookies.set({ name, value: '', ...options })
            },
        }
    }

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        options
    )

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        const redirectUri = req.nextUrl.clone()
        redirectUri.pathname = '/login'
        return NextResponse.redirect(redirectUri.toString())
    }

    // check for private paths
    if (session) {
        const publicAuthPath = [
            '/login',
            '/register',
            '/forgot-password',
            '/reset-password',
        ]

        if (publicAuthPath.includes(req.nextUrl.pathname)) {
            const redirectUri = req.nextUrl.clone()
            redirectUri.pathname = '/dashboard'
            return NextResponse.redirect(redirectUri.toString())
        }
    } else {
        const privateAuthPath = [
            '/dashboard',
            '/dashboard/:path*',
        ]

        if (privateAuthPath.includes(req.nextUrl.pathname)) {
            const redirectUri = req.nextUrl.clone()
            redirectUri.pathname = '/login'
            return NextResponse.redirect(redirectUri.toString())
        }
    }

    return response
}

export const config = {
    matcher: [
        // public user
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',

        // logged user
        '/dashboard',
        '/dashboard/:path*',
    ]
}