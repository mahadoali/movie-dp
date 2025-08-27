"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="p-4 flex justify-between bg-gray-800 text-white">
      <Link href="/" className="font-bold text-xl">
        MoovieDB
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/search">Search</Link>
        <Link href="/favorites">Favorites</Link>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span>{session.user?.name}</span>
            <button onClick={() => signOut()} className="underline">
              Sign out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="underline">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
