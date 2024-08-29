import { Metadata } from "next";
import UsersTable from "@/app/ui/users/UsersTable";

export const metadata: Metadata = {
  title: "Users",
};

export default function Users() {
  return (
    <div className="text-center">
      <h2 className="text-5xl">Users</h2>
      <UsersTable />
    </div>
  );
}
