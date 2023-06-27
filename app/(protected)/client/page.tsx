'use client'
import { useSession } from "next-auth/react"

const Client = () => {
    const { data: session } = useSession({
        required: true
    })

    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-5xl font-bold">Client Component</h1>
                        <p className="py-6">Ini adalah sebuah pages dengan client komponen di dalamnya.</p>
                        <button className="btn btn-primary">Selamat Datang {session?.user?.name}</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Client