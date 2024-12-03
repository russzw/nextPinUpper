import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-black shadow-sm font-sans">
            <nav className="flex justify-between items-center bg-background ">
                {/* Logo */}
                <Link href="/">
                    <Image src="/logo2.png" alt="logo" width={154} height={30} />
                </Link>

                {/* User Navigation */}
                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        // If the user is logged in
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <button onClick={signOut}>
                                <span>Sign Out</span>
                            </button>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        // If the user is not logged in
                        <button onClick={async() => {
                            "use server"
                            await signIn("github")
                        }}>
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;