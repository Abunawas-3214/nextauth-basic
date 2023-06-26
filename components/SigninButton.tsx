'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const SigninButton = () => {
    const { data: session } = useSession()
    if (session && session.user)
        return (
            <div>
                <button onClick={() => signOut()} className="btn btn-error">Sign Out: {session.user.name}</button>
            </div>
        )
    return (
        <div>
            <button onClick={() => signIn()} className="btn btn-primary">Sign In</button>
        </div>
    )
}

export default SigninButton