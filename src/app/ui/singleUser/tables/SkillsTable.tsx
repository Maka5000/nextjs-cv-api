import { fetchSkills } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";
import SkillsForm from "../modals/forms/SkillsForm";
import TableModal from "../modals/tableModal";
import { deleteSkill } from "@/app/lib/actions";

export default async function SkillsTable({
  userid,
}: Readonly<{ userid: string }>) {
  const skills = await fetchSkills(userid);

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
                    IconURL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <TableModal btnTitle="Add Skill" modalTitle="Add Skill">
                      <SkillsForm userid={userid} />
                    </TableModal>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Icon
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {skill.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {skill.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={skill.user_id}
                        itemId={skill.id}
                        deleteHandler={{ item: deleteSkill }}
                        itemName={skill.name}
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
