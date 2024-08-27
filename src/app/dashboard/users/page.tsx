import { Metadata } from "next";
import UsersTable from "@/app/ui/users/table";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="text-center">
      <h2 className="text-5xl">Users</h2>
      <UsersTable />
    </div>
  );
}
