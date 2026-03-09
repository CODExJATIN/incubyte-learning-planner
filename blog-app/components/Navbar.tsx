import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex gap-4">
                <li>
                    <Link href="/" className="text-white">Home</Link>
                </li>
                <li>
                    <Link href="/blog/create" className="text-white">Create Blog</Link>
                </li>
            </ul>
        </nav>
    )
}