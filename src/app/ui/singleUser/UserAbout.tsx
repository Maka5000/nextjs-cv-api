"use client";

import { changeUserAbout } from "@/app/lib/actions";
import { useEffect, useRef, useState } from "react";

export default function UserAbout({
  userid,
  userabout,
}: Readonly<{ userid: string; userabout: string }>) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newAbout, setNewAbout] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setNewAbout("");
    }
  }, [isEditing]);

  async function handleAcceptClick() {
    try {
      setIsLoading(true);

      if (newAbout) {
        await changeUserAbout(userid, newAbout);
      }
    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <div>
      <div className="text-end">
        <button
          type="button"
          className={`${
            newAbout ? "" : "hidden"
          } bg-white rounded-full transition-colors  max-w-10 hover:bg-blue-500 focus:bg-blue-500 ${
            isLoading ? "animate-bounce" : ""
          }`}
          onClick={handleAcceptClick}
          title="Accept"
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
            isEditing ? "hover:bg-slate-300" : "hover:bg-blue-500"
          } max-w-10 `}
          onClick={() => setIsEditing(!isEditing)}
          title={isEditing ? "Cancel" : "Edit"}
        >
          <img
            src={
              isEditing ? "/images/user/close.svg" : "/images/user/pencil.svg"
            }
            alt={isEditing ? "close.svg" : "check.svg"}
            className="max-w-10"
          />
        </button>
      </div>
      {isEditing ? (
        <>
          <textarea
            defaultValue={userabout}
            className="border-2 w-full px-1"
            onChange={(e) => setNewAbout(e.currentTarget.value)}
            maxLength={255}
            ref={textAreaElement}
          />
          {textAreaElement.current ? (
            <div className="text-end">
              {newAbout.length} / {textAreaElement.current.maxLength}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <p>{userabout}</p>
      )}
    </div>
  );
}
