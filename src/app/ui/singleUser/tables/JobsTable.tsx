import { fetchJobs } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";
import { createJob, deleteJob } from "@/app/lib/actions";
import CreateButton from "../../CreateButton";
import JobsForm from "../modals/forms/JobsForm";

export default async function JobsTable({
  userid,
}: Readonly<{ userid: string }>) {
  const jobs = await fetchJobs(userid);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Experience
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <CreateButton
                      btnTitle="Add Project"
                      modalTitle="Add Project"
                      userid={userid}
                      createHandler={{ item: createJob }}
                      imageType="projects-image"
                    >
                      <JobsForm />
                    </CreateButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {job.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {job.experience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={job.user_id}
                        itemId={job.id}
                        itemName={job.position}
                        deleteHandler={{ item: deleteJob }}
                      />
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
