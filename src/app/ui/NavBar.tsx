"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();

  const [navHidden, setNavHidden] = useState<boolean>(true);

  const navElement = useRef<HTMLElement>(null);

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (!navHidden && event.target !== navElement.current) {
        setNavHidden(true);
      }
    }

    if (!navHidden) {
      document.querySelector("body")?.addEventListener("click", handler);
    } else {
      document.querySelector("body")?.removeEventListener("click", handler);
    }

    return () =>
      document.querySelector("body")?.removeEventListener("click", handler);
  }, [navHidden]);

  return (
    <>
      <div className="lg:hidden w-full bg-blue-500 flex align-middle items-center justify-around text-white relative">
        <h1 className="text-5xl font-bold">CV API</h1>
        <div
          className="flex flex-col justify-between w-12 h-8 hover:opacity-65 cursor-pointer"
          onClick={() => setNavHidden(!navHidden)}
        >
          <span className="block bg-white w-full h-2 rounded-lg"></span>
          <span className="block bg-white w-full h-2 rounded-lg"></span>
          <span className="block bg-white w-full h-2 rounded-lg"></span>
        </div>
        <nav
          className={
            navHidden
              ? `hidden`
              : "block absolute w-full top-full left-0 bg-blue-500 text-center z-10"
          }
          ref={navElement}
        >
          <ul className="flex flex-col gap-y-4 py-4">
            <li>
              <Link
                href={"/dashboard"}
                className={`link ${
                  pathname === "/dashboard" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-blue-700 hover:text-white`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/users"}
                className={`link ${
                  pathname === "/dashboard/users" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-blue-700 hover:text-white`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/apikey"}
                className={`link ${
                  pathname === "/dashboard/apikey" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-blue-700 hover:text-white`}
              >
                Api key
              </Link>
            </li>
          </ul>
          <div className="text-end">
            <button
              type="button"
              onClick={() => signOut()}
              className="bg-red-500 rounded-lg px-3 hover:bg-red-900 transition-colors mb-5 mr-5"
            >
              log out
            </button>
          </div>
        </nav>
      </div>
      <div
        className={`
          min-h-screen 
          bg-blue-500 
          w-full 
          max-w-72 
          text-center py-10
          text-white
          hidden
          lg:flex
          lg:flex-col
          `}
      >
        <h1 className="text-5xl font-bold">CV API</h1>
        <nav className="mt-16">
          <ul className="flex flex-col gap-y-5">
            <li>
              <Link
                href={"/dashboard"}
                className={`link ${
                  pathname === "/dashboard" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-white hover:text-black`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/users"}
                className={`link ${
                  pathname === "/dashboard/users" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-white hover:text-black`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/apikey"}
                className={`link ${
                  pathname === "/dashboard/apikey" ? "active" : ""
                } text-3xl block w-full transition-colors hover:bg-blue-700 hover:text-white`}
              >
                Api key
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-grow items-end justify-center">
          <button
            type="button"
            onClick={() => signOut()}
            className="bg-red-500 rounded-lg px-3 hover:bg-red-900 transition-colors"
          >
            log out
          </button>
        </div>
      </div>
    </>
  );
}
