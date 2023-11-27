import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Page() {
    /*
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.from('nvl_categories').select()

    console.log(data)
    */

    return (
        <section className="py-20">
            <div className="container">
                <div className="mx-auto max-w-[640px] text-center">
                    <h1 className="text-5xl font-medium">
                        Novelia
                    </h1>
                    <p className="mt-4">
                        Platform untuk menulis dan membaca novel.
                    </p>
                    <p className="flex gap-4 mt-8 items-center justify-center">
                        <Link href="/login">
                            Login
                        </Link>
                        <Link href="/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}