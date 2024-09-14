"use client";

import { changeUserName } from "@/app/lib/actions";
import { useEffect, useState } from "react";

export default function UserName({
  username,
  userId,
}: Readonly<{ username: string; userId: string }>) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isEditing) {
      setNewUserName("");
    }
  }, [isEditing]);

  async function handleAcceptClick() {
    try {
      setIsLoading(true);

      if (newUserName) {
        await changeUserName(userId, newUserName);
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <>
      <div className="flex">
        {isEditing ? (
          <input
            type="text"
            defaultValue={username}
            onChange={(e) => setNewUserName(e.currentTarget.value)}
            className="mr-3 px-3"
          />
        ) : (
          <h2 className="text-4xl mr-3">{username}</h2>
        )}
        <button
          type="button"
          className={`${
            newUserName ? (newUserName === username ? "hidden" : "") : "hidden"
          } bg-white rounded-full transition-colors hover:bg-blue-500 focus:bg-blue-500 max-w-10 ${
            isLoading ? "animate-pulse" : ""
          }`}
          onClick={handleAcceptClick}
        >
          <img
            src="/images/user/check.svg"
            alt="check.svg"
            className="max-w-10"
          />
        </button>
        <button
          type="button"
          className={`bg-white rounded-full transition-colors ${
            isEditing ? "hover:bg-slate-400" : "hover:bg-blue-500"
          } max-w-10`}
          onClick={() => setIsEditing(!isEditing)}
        >
          <img
            src={
              isEditing ? `/images/user/close.svg` : `/images/user/pencil.svg`
            }
            alt={isEditing ? "close.svg" : "pencil.svg"}
            className="max-w-10"
          />
        </button>
      </div>
      <span> id: {userId} </span>
    </>
  );
}
