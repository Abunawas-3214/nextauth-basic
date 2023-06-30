import Navbar from "@/components/Navbar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {!session ?
              <div>
                <h1 className="text-5xl font-bold">Welcome</h1>
                <p className="py-6">Kamu masih belum masuk nih, masuk yuk.</p>
                <Link href={'/auth/login?callbackUrl=/server'} className="btn btn-primary">Masuk</Link>
              </div>
              :
              <div>
                <h1 className="text-5xl font-bold">Hello {session.user?.name}</h1>
                <p className="py-6">Kamu udah masuk nih</p>
              </div>
            }
          </div>
        </div>
      </div>
    </main>

  )
}
