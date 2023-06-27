import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
const User = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <h1 className="text-5xl font-bold">Ini Panel User</h1>
                        {!session ? (
                            <p className="py-6">Kamu belum masuk nih.</p>
                        ) : (
                            <div>
                                <p className="py-6">Hai {session?.user?.name} kamu bisa lihat tombol di bawah ini lhoo.</p>
                                <button className="btn btn-primary">Role kamu adalah: {session?.user?.role}</button>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default User