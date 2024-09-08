import { fetchProjects } from "@/app/lib/data";
import DeleteBtn from "../../DeleteButton";
import { createProject, deleteProject } from "@/app/lib/actions";
import CreateButton from "../../CreateButton";
import ProjectsForm from "../modals/forms/ProjectsForm";

export default async function ProjectsTable({
  userid,
}: Readonly<{ userid: string }>) {
  const projects = await fetchProjects(userid);

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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    ImageURL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    <CreateButton
                      btnTitle="Add Project"
                      modalTitle="Add Project"
                      userid={userid}
                      createHandler={{ withImage: createProject }}
                      imageType="projects-image"
                    >
                      <ProjectsForm />
                    </CreateButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {project.imageurl ? (
                        <img
                          src={`https://${project.imageurl}`}
                          alt={project.name}
                          className="w-full max-w-8"
                        />
                      ) : (
                        <span>Not set</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {project.link}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <DeleteBtn
                        userid={project.user_id}
                        itemId={project.id}
                        itemName={project.name}
                        deleteHandler={{ item: deleteProject }}
                        iconURL={project.imageurl}
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
