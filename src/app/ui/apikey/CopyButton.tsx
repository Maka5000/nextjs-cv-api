import { useEffect, useState } from "react";

type PageProps = {
  textToCopy: string;
};

export default function CopyButton({ textToCopy }: PageProps) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  }

  useEffect(() => {
    let checkTimer: NodeJS.Timeout;
    if (copied) {
      checkTimer = setTimeout(() => {
        setCopied(false);
      }, 1200);
    }

    return () => {
      if (checkTimer) clearTimeout(checkTimer);
    };
  }, [copied]);

  return (
    <button
      type="button"
      className="bg-blue-500 rounded-md p-1 hover:bg-blue-700"
      onClick={handleCopy}
    >
      {copied ? (
        <img src="/check-icon.svg" alt="copy-svg" className="w-7" />
      ) : (
        <img src="/copy-icon.svg" alt="copy-svg" className="w-7" />
      )}
    </button>
  );
}
