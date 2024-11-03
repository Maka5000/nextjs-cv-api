"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  searchItemName,
}: Readonly<{ searchItemName: string }>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term : string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="p-5">
      <div className="flex relative">
        <input
          type="text"
          className="rounded-lg w-full max-w-md bg-no-repeat pl-8 pr-3 pt-1 pb-1 bg-gray-200 outline-gray-400"
          placeholder={`Search for ${searchItemName}...`}
          style={{
            backgroundImage: "url('/images/search.png')",
            backgroundPositionY: "50%",
            backgroundPositionX: "5px",
            backgroundSize: "20px 20px",
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
    </div>
  );
}
