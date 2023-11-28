import { getSession } from '@/lib/actions'
import { Button } from '@/components/Button'

export default async function Page() {
    /*
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.from('nvl_categories').select()

    console.log(data)
    */

    const session = await getSession()

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
                        { session ? (
                            <Button alias="link" href="/dashboard">
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button alias="link" href="/login" className="min-w-[120px]">
                                    Login
                                </Button>
                                <Button alias="link" href="/register" className="min-w-[120px]">
                                    Register
                                </Button>
                            </>
                        ) }
                    </p>
                </div>
            </div>
        </section>
    )
}