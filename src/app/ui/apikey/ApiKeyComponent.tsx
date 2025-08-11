"use client";

import {
  changeApiKey,
  createApiKey,
  deleteApiKey,
  generateApiKey,
  hashKey,
} from "@/app/lib/actions";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import CopyButton from "./CopyButton";

type PageProps = {
  isApiKeyExist?: boolean;
  session: Session;
  db_user_id: string;
};

export default function ApiKeyComponent({
  isApiKeyExist,
  session,
  db_user_id,
}: PageProps) {
  const [apiKey, setApiKey] = useState<string>();
  const [keyGenerated, setKeyGenerated] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isApiKeyExist) {
      setApiKey("api key created");
    } else {
      setApiKey("Generate api key by clicking a button bellow");
    }
  }, []);

  async function handleGenerate() {
    try {
      setLoading(true);
      const key = await generateApiKey();
      setApiKey(key);
      setKeyGenerated(true);

      const hashed_key = await hashKey(key);

      if (isApiKeyExist) {
        await changeApiKey(session.user.id, hashed_key);
        return;
      }

      await createApiKey(session.user.id, session.user.email!, hashed_key);
    } catch (error) {
      console.error("Api key generating error: ", error);
      throw Error("Failed to generate api key");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);

      if (!isApiKeyExist) return;

      await deleteApiKey(session.user.id);

      setApiKey("Generate api key by clicking a button bellow");
      setKeyGenerated(false);
    } catch (error) {
      console.error("Api key deleting error: ", error);
      throw Error("Failed to delete api key");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow overflow-hidden mt-4">
      <p>
        <b>Your user id: </b>
      </p>
      <div className="flex mb-4">
        <input
          type="text"
          className="border-2 px-2 w-full outline-none"
          value={db_user_id ?? " "}
          readOnly
        />
        <CopyButton textToCopy={db_user_id} />
      </div>
      <p>
        <b>Api key: </b>
      </p>
      <div className="flex">
        <input
          type="text"
          className="border-2 px-2 w-full outline-none"
          value={apiKey ?? " "}
          readOnly
        />
        {keyGenerated && apiKey && <CopyButton textToCopy={apiKey} />}
      </div>
      {keyGenerated && (
        <p className="text-red-500 text-xs">
          Copy this api key and put it into your enviromental variables.
          <b> Do not show api key to anyone!</b>
        </p>
      )}
      <div className="text-right">
        {isApiKeyExist && (
          <button
            type="button"
            className={`text-right bg-red-500 rounded-xl px-5 text-white transition-colors hover:bg-red-700 max-w-fit mt-4 mr-2 ${
              loading && "animate-pulse"
            }`}
            onClick={handleDelete}
            disabled={loading}
          >
            Delete key
          </button>
        )}
        <button
          type="button"
          className={`text-right bg-blue-500 rounded-xl px-5 text-white transition-colors hover:bg-blue-700 max-w-fit mt-4 ${
            loading && "animate-pulse"
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          Generate key
        </button>
      </div>
    </div>
  );
}
