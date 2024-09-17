"use client";

import { CreateFunction, imageType } from "@/app/lib/definitions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export default function CreateButton({
  children,
  btnTitle,
  modalTitle,
  userid,
  createHandler,
  imageType,
}: Readonly<{
  children: React.ReactNode;
  btnTitle: string;
  modalTitle: string;
  userid: string;
  createHandler: CreateFunction;
  imageType?: imageType;
}>) {
  const MySwal = withReactContent(Swal);

  let inputFields: NodeListOf<HTMLInputElement>;

  async function S3UploadImage(
    userId: string,
    imageFile: File,
    imageType: imageType
  ) {
    const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_IDENTITY_REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: process.env.NEXT_PUBLIC_AWS_IDENTITY_REGION },
        identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_ID!,
      }),
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: `${userId}/${imageType}/${imageFile.name}`,
      Body: imageFile,
      ContentType: imageFile.type,
    });

    await s3Client.send(command);
  }

  function openModal() {
    MySwal.fire({
      title: <p>{modalTitle}</p>,
      html: <div>{children}</div>,
      showCancelButton: true,
      confirmButtonText: "Create",
      confirmButtonColor: "#1d4ed8",
      didOpen: () => {
        const popup = Swal.getPopup();
        inputFields = popup!.querySelectorAll(
          "input[type=text], input[type=file]#file-input"
        );
      },
      preConfirm: async () => {
        const inputValues: string[] = [];

        inputFields.forEach((field) => {
          if (field.required && !field.value) {
            field.style.borderColor = "red";
            MySwal.showValidationMessage("Please fill all fields!");
          } else {
            field.style.borderColor = "";
            inputValues.push(field.value);
          }
        });

        if (inputValues.length === inputFields.length) {
          let inputFiles;
          let inputFileName;

          if (imageType) {
            inputFiles = inputFields[2].files;
            if (inputFiles?.length) {
              inputFileName = `d3l2iy99t9mkdn.cloudfront.net/${userid}/${imageType}/${
                inputFiles![0].name
              }`;
              await S3UploadImage(userid, inputFiles[0], imageType);
            }
          }

          if (createHandler.item) {
            await createHandler.item(userid, ...inputValues);
          } else if (createHandler.withImage) {
            await createHandler.withImage(
              userid,
              inputFileName!,
              ...inputValues
            );
          }
          return { message: `${inputValues[1]} created!` };
        }
      },
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isDismissed) return;
      MySwal.fire({
        title: "Created",
        icon: "success",
        text: result.value.message,
      });
    });
  }

  return (
    <button
      onClick={openModal}
      type="submit"
      className="bg-blue-500 rounded-xl px-5 text-white text-sm transition-colors hover:bg-blue-700"
    >
      {btnTitle}
    </button>
  );
}
