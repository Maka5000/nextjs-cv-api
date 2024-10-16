export default function UsageUsers() {
  return (
    <div>
      <h3 className="font-bold">Users:</h3>
      <p>
        <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
          /api/users
        </span>
        - to get all user profiles with all info
      </p>
      <ul className="list-disc pl-8 md:pl-20">
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?userid
          </span>
          - query to get user profile by user's id
        </li>
        <li>
          <span className="bg-gray-400 rounded-lg max-w-fit text-gray-200 px-2">
            ?name
          </span>
          - query to get user profile by user's name
        </li>
      </ul>
    </div>
  );
}
