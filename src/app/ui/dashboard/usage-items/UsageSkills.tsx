export default function UsageSkills() {
  return (
    <div>
      <h3 className="font-bold">Skills:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/skills
        </span>
        - to get all skills with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get skills by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?name
          </span>
          - query to get skills by specified name
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?level
          </span>
          - query to get skills by specified level
        </li>
      </ul>
    </div>
  );
}
