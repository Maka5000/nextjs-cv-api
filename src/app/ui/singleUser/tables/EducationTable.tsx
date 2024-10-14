import { createEducation, deleteEducation } from "@/app/lib/actions";
import EducationForm from "../modals/forms/EducationForm";
import CreateButton from "../../CreateButton";
import { fetchEducations } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";

export default async function EducationTable({
  userid,
}: Readonly<{ userid: string }>) {
  const educations = await fetchEducations({ userid: userid });

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
                    Establishment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Program
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Degree
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <CreateButton
                      modalTitle="Add Education"
                      btnTitle="Add Education"
                      userid={userid}
                      createHandler={{ item: createEducation }}
                    >
                      <EducationForm />
                    </CreateButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {educations.map((ed) => (
                  <tr key={ed.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {ed.establishment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {ed.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {ed.degree}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={ed.user_id}
                        itemName={ed.program}
                        itemId={ed.id}
                        deleteHandler={{ item: deleteEducation }}
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
