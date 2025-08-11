import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { fetchApiKeyByUserId } from "@/app/lib/data";
import ApiKeyComponent from "@/app/ui/apikey/ApiKeyComponent";

export default async function ApiKey() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }

  const fetchedApiKey = await fetchApiKeyByUserId(session.user.id);

  let isApiKeyExist: boolean;

  if (fetchedApiKey && fetchedApiKey.api_key_hash) {
    isApiKeyExist = true;
  } else {
    isApiKeyExist = false;
  }

  return (
    <div>
      <h2 className="text-5xl text-center">Api key</h2>
      <ApiKeyComponent
        session={session}
        isApiKeyExist={isApiKeyExist}
        db_user_id={session.user.id}
      />
    </div>
  );
}
