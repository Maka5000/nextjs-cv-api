export default function UsageJobs() {
  return (
    <div>
      <h3 className="font-bold">Jobs:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/jobs
        </span>
        - to get all jobs with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get jobs by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?company
          </span>
          - query to get jobs by specified company
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?position
          </span>
          - query to get jobs by specified position
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?experience
          </span>
          - query to get jobs by specified experience
        </li>
      </ul>
    </div>
  );
}
