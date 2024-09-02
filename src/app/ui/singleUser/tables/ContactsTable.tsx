import { fetchContacts } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";
import { createContact, deleteContact } from "@/app/lib/actions";
import CreateButton from "../modals/CreateButton";
import ContactsForm from "../modals/forms/ContactsForm";

export default async function ContactsTable({
  userid,
}: Readonly<{ userid: string }>) {
  const contacts = await fetchContacts(userid);

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
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <CreateButton
                      btnTitle="Add Contact"
                      modalTitle="Add Contact"
                      userid={userid}
                      createHandler={createContact}
                    >
                      <ContactsForm />
                    </CreateButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {contact.iconurl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {contact.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {contact.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={contact.user_id}
                        itemId={contact.id}
                        itemName={contact.contact}
                        deleteHandler={{ item: deleteContact }}
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
