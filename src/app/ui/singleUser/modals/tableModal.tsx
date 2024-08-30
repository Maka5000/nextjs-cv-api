"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TableModal({
  children,
  btnTitle,
  modalTitle
}: Readonly<{ children: React.ReactNode; btnTitle: string, modalTitle : string }>) {
  const MySwal = withReactContent(Swal);

  function openModal() {
    MySwal.fire({
      title: <p>{modalTitle}</p>,
      html: <div>{children}</div>,
      showCancelButton : true,
      showConfirmButton : false,
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
