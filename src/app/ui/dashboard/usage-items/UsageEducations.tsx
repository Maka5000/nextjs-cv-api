export default function UsageEducations() {
  return (
    <div>
      <h3 className="font-bold">Educations:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/educations
        </span>
        - to get all educations with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get educations by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?establishment
          </span>
          - query to get educations by specified estanlishment
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?program
          </span>
          - query to get educations by specified program
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?degree
          </span>
          - query to get educations by specified degree
        </li>
      </ul>
    </div>
  );
}
