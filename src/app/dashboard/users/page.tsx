import { Metadata } from "next";
import UsersTable from "@/app/ui/users/UsersTable";
import { Suspense } from "react";
import TableSkeleton from "@/app/ui/skeletons/TableSkeleton";
import Search from "@/app/ui/Search";

export const metadata: Metadata = {
  title: "Users",
};

export default function Users({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="text-center">
      <h2 className="text-5xl">Users</h2>
      <Search searchItemName="users" />
      <Suspense fallback={<TableSkeleton />}>
        <UsersTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
