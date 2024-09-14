"use client";

import { changeUserAvatar } from "@/app/lib/actions";
import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { ChangeEvent, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "eu-north-1" },
    identityPoolId: "eu-north-1:d6ca6804-100a-4df1-a9a6-9bdd5e59d7e7",
  }),
});

export default function UserAvatar({
  avatar_url,
  userid,
  imageAlt,
}: Readonly<{
  avatar_url: string;
  userid: string;
  imageAlt: string;
}>) {
  const defaultAvatarUrl = "/images/user/defaultavatar.jpg";
  const inputFileElement = useRef<HTMLInputElement>(null);
  const formElement = useRef<HTMLFormElement>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [confirmSaveHidden, setConfirmSaveHidden] = useState<boolean>(true);
  const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(false);

  function openFileInput() {
    inputFileElement.current!.click();
  }

  function previewAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files?.length) {
      const imageUrl = URL.createObjectURL(e.currentTarget.files[0]);
      setImageUrl(imageUrl);
      setConfirmSaveHidden(false);
    }
  }

  async function getListObjects() {
    try {
      const command = new ListObjectsCommand({
        Bucket: "cv-api-bucket",
      });

      const response = await s3Client.send(command);

      return response.Contents;
    } catch (error) {
      console.error("Avatar Error: ", error);
      throw new Error("Something went wrong! Coudn't get the avatar");
    }
  }

  async function saveAvatar() {
    try {
      if (!inputFileElement.current!.files?.length) return;

      setIsAvatarLoading(true);
      const imageFile = inputFileElement.current?.files![0];

      const ListOfObjects = await getListObjects();

      if (ListOfObjects?.length) {
        ListOfObjects.forEach((obj) => {
          if (obj.Key?.includes("avatar") && obj.Key.includes(userid)) {
            deleteAvatar(obj.Key);
          }
        });
      }

      const command = new PutObjectCommand({
        Bucket: "cv-api-bucket",
        Key: `avatar/${userid}-${imageFile!.name}`,
        Body: imageFile,
        ContentType: imageFile!.type,
      });

      await s3Client.send(command);

      const avatarURL = `d3l2iy99t9mkdn.cloudfront.net/avatar/${userid}-${
        imageFile!.name
      }`;

      await changeUserAvatar(userid, avatarURL);

      setConfirmSaveHidden(true);
    } catch (error) {
      console.error("Avatar Error: ", error);
      throw new Error("Something went wrong! Coudn't change avatar");
    } finally {
      setIsAvatarLoading(false);
    }
  }

  function cancelAvatar() {
    setImageUrl("");
    setConfirmSaveHidden(true);
    formElement.current?.reset();
  }

  async function deleteAvatar(objKey?: string) {
    let splittedAvatarUrl = avatar_url?.split("/");

    if (!objKey) {
      splittedAvatarUrl?.shift();
    }

    if (objKey) {
      splittedAvatarUrl = objKey.split("/");
    }

    const avatarKey = splittedAvatarUrl!.join("/");

    setIsAvatarLoading(true);
    try {
      const s3Client = new S3Client({
        region: "eu-north-1",
        credentials: fromCognitoIdentityPool({
          clientConfig: { region: "eu-north-1" },
          identityPoolId: "eu-north-1:d6ca6804-100a-4df1-a9a6-9bdd5e59d7e7",
        }),
      });

      const command = new DeleteObjectCommand({
        Key: avatarKey,
        Bucket: "cv-api-bucket",
      });

      await s3Client.send(command);

      await changeUserAvatar(userid, defaultAvatarUrl);
    } catch (error) {
      console.error("Avatar Error: ", error);
      throw new Error("Something went wrong! Coudn't delete avatar");
    } finally {
      setIsAvatarLoading(false);
      setImageUrl("");
    }
  }

  function openDeleteModal() {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Reset avatar",
      text: "Are you sure you want reset your avatar to default?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        deleteAvatar();
        try {
          await deleteAvatar();
        } catch (error) {
          Swal.showValidationMessage(`Something went wrong: ${error}`);
        }
        return { message: `Avatar deleted!` };
      },
    }).then((result) => {
      if (result.isDismissed) return;

      MySwal.fire({
        title: result.value.message,
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    });
  }

  return (
    <div className="grid grid-cols-2">
      <img
        className="w-full max-w-44"
        src={
          imageUrl
            ? imageUrl
            : avatar_url !== defaultAvatarUrl
            ? `https://${avatar_url}`
            : avatar_url
        }
        alt={
          avatar_url === defaultAvatarUrl
            ? "defaultavatar Vecteezy.com"
            : imageAlt
        }
        title={avatar_url === defaultAvatarUrl ? "Vecteezy.com" : imageAlt}
        onClick={getListObjects}
      />
      <div className="flex flex-col ml-2">
        <form ref={formElement}>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            hidden
            ref={inputFileElement}
            onChange={previewAvatar}
          />
        </form>
        <button
          className="bg-white rounded-full transition-colors hover:bg-blue-500 max-w-10"
          type="button"
          onClick={openFileInput}
        >
          <img
            className="w-full max-w-10"
            src="/images/user/pencil.svg"
            alt="pencil"
          />
        </button>
        <button
          type="button"
          className={`bg-white rounded-full transition-colors hover:bg-blue-500 max-w-10 ${
            avatar_url === defaultAvatarUrl ? "hidden" : ""
          }`}
          onClick={openDeleteModal}
        >
          <img
            className="w-full max-w-10"
            src="/images/user/trash.svg"
            alt="trashcan"
          />
        </button>
      </div>
      <div
        className={`flex mt-5 gap-x-5 justify-center ${
          confirmSaveHidden ? "hidden" : "flex"
        }`}
      >
        <button
          type="button"
          className="text-white bg-blue-500 rounded-xl px-3 flex items-center"
          onClick={saveAvatar}
        >
          <span>Save</span>
          <span
            className={`border-l-2 border-r-2 border-t-2 border-white h-3 w-3 rounded-full ml-2 animate-spin ${
              isAvatarLoading ? "block" : "hidden"
            }`}
          ></span>
        </button>
        <button
          type="button"
          className="text-white bg-gray-500 rounded-xl px-3"
          onClick={cancelAvatar}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
