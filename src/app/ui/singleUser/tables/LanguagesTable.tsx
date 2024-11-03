import { fetchLanguages } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";
import { createLanguage, deleteLanguage } from "@/app/lib/actions";
import CreateButton from "../../CreateButton";
import LanguagesForm from "../modals/forms/LanguagesForm";

export default async function LanguagesTable({
  userid,
}: Readonly<{ userid: string }>) {
  const languages = await fetchLanguages({ userid: userid });

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
                    Language
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
                    <CreateButton
                      btnTitle="Add Language"
                      modalTitle="Add Language"
                      userid={userid}
                      createHandler={{ item: createLanguage }}
                    >
                      <LanguagesForm />
                    </CreateButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {languages.map((lang) => (
                  <tr key={lang.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {lang.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {lang.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={userid}
                        itemId={lang.id}
                        itemName={lang.language}
                        deleteHandler={{ item: deleteLanguage }}
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
