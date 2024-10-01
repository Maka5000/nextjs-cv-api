"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function LoginForm() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const searchParams = useSearchParams();
  const error = searchParams.get("error") ? "Invalid credentials" : "";

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      callbackUrl: "/dashboard",
      redirect: true,
      email: userInfo.email,
      password: userInfo.password,
    });

    console.log(res);
  };

  return (
    <form
      className="flex flex-col justify-between mb-5 gap-7"
      onSubmit={handleSubmit}
    >
      <input
        id="email"
        type="email"
        name="email"
        placeholder="email"
        className="p-2 border-solid border-2 rounded"
        defaultValue={userInfo.email}
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, email: target.value });
        }}
        required
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        className="p-2 border-solid border-2 rounded"
        defaultValue={userInfo.password}
        onChange={({ target }) => {
          setUserInfo({ ...userInfo, password: target.value });
        }}
        required
      />
      <button
        type="submit"
        className={`
              border-solid 
              rounded-md 
              border-transparent 
              px-5 
              py-2
              bg-blue-500 
              text-white
              sm:text-3xl
              hover:bg-blue-800
              transition-colors
              `}
      >
        Login
      </button>
      <div className="text-red-500">{error}</div>
    </form>
  );
}
