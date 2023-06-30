import Link from "next/link"


const ErrorPage = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Restricted Page</h1>
                        <p className="py-6">Anda tidak memiliki akses untuk membuka page ini</p>
                        <Link href={'/'} className="btn btn-error">Kembali</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage