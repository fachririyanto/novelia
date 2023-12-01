'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { ImageCover } from '@/components/Images'
import { Button } from '@/components/Button'

interface AuthMenuProps {
    email?: string,
    profile: {
        username?: string | null,
        full_name?: string | null,
        photo?: string | null,
    } | null,
}

export function AuthMenu({ email, profile }: AuthMenuProps) {
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const userMenuRef = useRef<HTMLLIElement>(null)

    const handleOpenUserMenu = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setOpenUserMenu(!openUserMenu)
    }

    const closeMenu = () => {
        setOpenUserMenu(false)
    }

    // handle logout
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            alert(error.message)
            return
        }

        window.location.reload()

        return
    }

    // handle click outside of user menu
    const handleClickOutside = (e: MouseEvent) => {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
            setOpenUserMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <>
            <li>
                <Link href="/dashboard/buat-novel" className="hover:text-primary">Tulis Novel</Link>
            </li>
            <li className="w-10 relative" ref={ userMenuRef }>
                <a href="block" onClick={ handleOpenUserMenu }>
                    <ImageCover
                        className="rounded-full"
                        widthRatio={ 40 }
                        heightRatio={ 40 }
                        loading="lazy"
                        src="/images/default/mistery-man.png"
                        alt={ email }
                    />
                </a>
                <ul className={ `${openUserMenu ? 'block' : 'hidden'} absolute top-12 right-0 bg-white border border-gray-100 rounded-md shadow-sm p-5 w-[300px]` }>
                    <li className="mb-3 pb-5 border-b border-gray-100">
                        <h3 className="mb-1">{ profile?.full_name }</h3>
                        <span className="block font-medium text-sm normal-case">{ email }</span>
                    </li>
                    <li>
                        <Link href="/dashboard" className="block py-2 hover:text-primary" onClick={ closeMenu }>Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/tulisanku" className="block py-2 hover:text-primary" onClick={ closeMenu }>Tulisanku</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/ubah-profil" className="block py-2 hover:text-primary" onClick={ closeMenu }>Ubah Profil</Link>
                    </li>
                    <li className="mt-3 pt-5 border-t border-gray-100">
                        <Button alias="button" className="flex w-full" variant="primary" onClick={ handleLogout }>Logout</Button>
                    </li>
                </ul>
            </li>
        </>
    )
}