import React from 'react'
import Link from 'next/link'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

const Admin = async () => {

    const session = await getServerSession(authOptions)
    console.log(session)

    if (session?.user.role !== 'ADMIN') {
        return redirect('/login?callbackUrl=/server')
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Yay, Kamu adalah admin</h1>
                        <p className="py-6">Kamu bisa membuka page ini</p>
                        <Link href={'/'} className="btn btn-primary">Kembali ke Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin