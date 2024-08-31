"use client";

import { createEducation } from "@/app/lib/actions";
import { CreateFunction } from "@/app/lib/definitions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CreateModal({
  children,
  btnTitle,
  modalTitle,
  userid,
  createHandler,
}: Readonly<{
  children: React.ReactNode;
  btnTitle: string;
  modalTitle: string;
  userid: string;
  createHandler: CreateFunction;
}>) {
  const MySwal = withReactContent(Swal);

  let inputFields: NodeListOf<HTMLInputElement>;

  function openModal() {
    MySwal.fire({
      title: <p>{modalTitle}</p>,
      html: <div>{children}</div>,
      showCancelButton: true,
      confirmButtonText: "Create",
      confirmButtonColor: "#1d4ed8",
      didOpen: () => {
        const popup = Swal.getPopup();
        inputFields = popup!.querySelectorAll("input[type=text]");
      },
      preConfirm: async () => {
        const inputValues: string[] = [];

        inputFields.forEach((field) => {
          if (field.required && !field.value) {
            field.style.borderColor = "red";
            MySwal.showValidationMessage("Please fill all fields!");
          } else {
            inputValues.push(field.value);
          }
        });

        if (inputValues.length === inputFields.length) {
          await createHandler(userid, ...inputValues);
          return { message: `${inputValues[1]} created!` };
        }
      },
      showLoaderOnConfirm: true,
    }).then((result) => {
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
