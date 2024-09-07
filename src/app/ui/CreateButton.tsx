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
      region: "eu-north-1",
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: "eu-north-1" },
        identityPoolId: "eu-north-1:d6ca6804-100a-4df1-a9a6-9bdd5e59d7e7",
      }),
    });

    const command = new PutObjectCommand({
      Bucket: "cv-api-bucket",
      Key: `${imageType}/${userId}-${imageFile.name}`,
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
            field.style.borderColor = "initial";
            inputValues.push(field.value);
          }
        });

        const inputFiles = inputFields[2].files;

        if (inputValues.length === inputFields.length) {
          if (imageType) {
            if (inputFiles?.length) {
              S3UploadImage(userid, inputFiles[0], imageType);
            }
          }

          await createHandler(
            userid,
            inputFiles?.length
              ? `d3l2iy99t9mkdn.cloudfront.net/${imageType}/${userid}-${
                  inputFiles![0].name
                }`
              : undefined,
            ...inputValues
          );
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
