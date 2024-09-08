"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeleteFunction, imageType } from "../lib/definitions";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export default function DeleteBtn({
  userid,
  itemId,
  itemName,
  deleteHandler,
  iconURL,
}: Readonly<{
  userid: string;
  itemId?: string;
  itemName: string;
  deleteHandler: DeleteFunction;
  iconURL?: string;
}>) {
  const MySwal = withReactContent(Swal);

  async function S3DeleteImage(imageKey: string) {
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "eu-north-1" },
        identityPoolId: "eu-north-1:d6ca6804-100a-4df1-a9a6-9bdd5e59d7e7",
      }),
    });

    const command = new DeleteObjectCommand({
      Key: imageKey,
      Bucket: "cv-api-bucket",
    });

    await s3Client.send(command);
  }

  function openModal() {
    MySwal.fire({
      title: "Are you sure?",
      html: (
        <div>
          <span>Do you really want to delete </span>
          <span className="text-red-500">{itemName}</span>
          <span> ? </span>
        </div>
      ),
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          if (itemId) {
            if (iconURL) {
              const splittedIconUrl = iconURL?.split("/");
              splittedIconUrl?.shift();

              const iconKey = splittedIconUrl!.join("/");
              await S3DeleteImage(iconKey);
            }

            await deleteHandler.item!(userid, itemId);
            return { message: `${itemName} deleted!` };
          }

          await deleteHandler.user!(userid);
          return { message: `${itemName} deleted!` };
        } catch (error) {
          Swal.showValidationMessage(`Something went wrong: ${error}`);
        }
      },
      showLoaderOnConfirm: true,
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
    <button
      type="button"
      onClick={openModal}
      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
    >
      Delete
    </button>
  );
}
