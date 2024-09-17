import { createUser } from "@/app/lib/actions";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : "Add user"
}

export default function AddUser() {
  return (
    <div className="pl-5 pr-5 pb-5">
      <h2 className="text-5xl text-center">Add User</h2>
      <div>
        <form action={createUser} className="flex flex-col" id="addUserForm">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            className="border-2 px-2"
            maxLength={255}
            required
          />
          <label htmlFor="userabout" className="mt-5">About</label>
          <textarea
            name="userabout"
            form="addUserForm"
            id="userabout"
            className="border-2 py-1 px-2"
            maxLength={255}
            required
          ></textarea>
          <div className="mt-5 text-end">
            <button
              type="submit"
              className="bg-blue-500 rounded-xl px-5 text-white transition-colors hover:bg-blue-700 max-w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
