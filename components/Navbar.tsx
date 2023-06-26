import Link from 'next/link'
import SigninButton from './SigninButton'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href="/" className="btn btn-ghost normal-case text-xl">Home</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/client">Client Component</Link></li>
                    <li><Link href="/server">Server Component</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <SigninButton />
            </div>
        </div>
    )
}

export default Navbar