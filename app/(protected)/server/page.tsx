import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

const Server = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
    if (!session) {
        return redirect('/auth/login?callbackUrl=/server')
    }

    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-5xl font-bold">Server Component</h1>
                        <p className="py-6">Ini adalah sebuah pages dengan server komponen di dalamnya.</p>
                        <button className="btn btn-primary">Halo {session?.user?.name}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Server