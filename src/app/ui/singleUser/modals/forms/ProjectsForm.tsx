import FileChooser from "@/app/ui/FileChooser";

export default function ProjectsForm() {
  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <label
          htmlFor="projectName"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Project name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <label
          htmlFor="projectLink"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Link
        </label>
        <input
          type="text"
          id="projectLink"
          name="projectLink"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <FileChooser />
      </div>
    </div>
  );
}
