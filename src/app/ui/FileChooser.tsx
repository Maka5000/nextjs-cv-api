"use client";

import { ChangeEvent, useRef, useState } from "react";

export default function FileChooser() {
  const FileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>(
    "Choose an image with .png, .jpg, .jpeg formats"
  );

  function openInput() {
    FileInput.current!.click();
  }

  function getFileName(e: ChangeEvent<HTMLInputElement>) {
    const inputFiles = e.currentTarget.files;

    if (inputFiles?.length) {
      const fileName = inputFiles[0].name;
      setFileName(fileName);
    }
  }

  return (
    <div>
      <label
        onClick={openInput}
        className="bg-blue-500 rounded-lg md:px-3 text-white hover:cursor-pointer hover:bg-blue-300"
      >
        Choose an image...
      </label>
      <input
        type="file"
        id="file-input"
        name="file-input"
        className="opacity-0 overflow-hidden absolute -z-10"
        ref={FileInput}
        onChange={getFileName}
        accept=".jpg, .png, .jpeg"
      />
      <div className="mt-3">{fileName}</div>
    </div>
  );
}
