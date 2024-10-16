export default function UsageLanguages() {
  return (
    <div>
      <h3 className="font-bold">Languages:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/languages
        </span>
        - to get all languages with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get languages by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?language
          </span>
          - query to get languages by specified language
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?level
          </span>
          - query to get lanugages by specified level
        </li>
      </ul>
    </div>
  );
}
