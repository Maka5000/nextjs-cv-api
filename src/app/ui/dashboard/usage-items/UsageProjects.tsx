export default function UsageProjects() {
  return (
    <div>
      <h3 className="font-bold">Projects:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/projects
        </span>
        - to get all projects with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get projects by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?name
          </span>
          - query to get projects by specified name
        </li>
      </ul>
    </div>
  );
}
