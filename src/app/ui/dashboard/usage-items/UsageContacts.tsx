export default function UsageContacts() {
  return (
    <div>
      <h3 className="font-bold">Contacts:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/contacts
        </span>
        - to get all contacts with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get contacts by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?type
          </span>
          - query to get contacts by specified type
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?contact
          </span>
          - query to get contacts by specified contact
        </li>
      </ul>
    </div>
  );
}
