"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DeleteFunction } from "../lib/definitions";

export default function DeleteBtn({
  userid,
  itemId,
  itemName,
  deleteHandler,
}: Readonly<{
  userid: string;
  itemId?: string;
  itemName: string;
  deleteHandler: DeleteFunction;
}>) {
  const MySwal = withReactContent(Swal);

  function openModal() {
    MySwal.fire({
      title: "Are you sure?",
      html: (
        <div>
          Do you really want to delete{" "}
          <span className="text-red-500">{itemName}</span> ?{" "}
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
