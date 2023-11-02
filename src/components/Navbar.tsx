import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import HButton from "./HButton";

export default function Navbar() {
  const { status, data } = useSession();
  return (
    <nav className="container">
      <ul className="flex gap-8 w-full py-8">
        {status === "authenticated" && (
          <li>
            <span>{data.user?.name}</span>
          </li>
        )}

        <li>
          <Link href="/">home</Link>
        </li>

        <li>
          <Link href="/posts">posts</Link>
        </li>

        <li className="ml-auto">
          {status === "authenticated" ? (
            <HButton onClick={() => signOut()}>Logout</HButton>
          ) : (
            <HButton onClick={() => signIn()}>Login</HButton>
          )}
        </li>
      </ul>
    </nav>
  );
}
