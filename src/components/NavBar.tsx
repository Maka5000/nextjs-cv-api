"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {

  const pathname = usePathname();

  return (
    <div
      className={`
    min-h-screen 
    bg-blue-500 
    w-full 
    max-w-72 
    text-center py-10
    text-white
    `}
    >
      <h1 className="text-5xl font-bold">CV API</h1>
      <nav className="mt-16">
        <ul className="flex flex-col gap-y-5">
          <li>
            <Link href={'/dashboard'} className={`link ${pathname === '/dashboard' ? 'active' : ''} text-3xl block w-full transition-colors hover:bg-white hover:text-black`}>Home</Link>
          </li>
          <li>
            <Link href={'/dashboard/users'} className={`link ${pathname === '/dashboard/users' ? 'active' : ''} text-3xl block w-full transition-colors hover:bg-white hover:text-black`}>Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
