import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import Link from "next/link";

export default async function UsersTable() {
  const users = await fetchUsers();

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <Link
                      href={"/dashboard/add-user"}
                      className="bg-blue-500 rounded-xl px-5 text-white text-sm transition-colors hover:bg-blue-700"
                    >
                      Add User
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-start">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/user/${user.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <form action={deleteUser}>
                        <input type="hidden" name="userid" value={user.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
