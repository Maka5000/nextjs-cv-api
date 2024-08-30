import { createSkill } from "@/app/lib/actions";

export default function SkillsForm({ userid }: Readonly<{ userid: string }>) {
  return (
    <form action={createSkill} className="flex flex-col gap-y-5">
      <input type="hidden" name="userid" value={userid} />
      <div>
        <label htmlFor="skillname">Name</label>
        <input
          type="text"
          id="skillname"
          name="skillname"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="level">Level</label>
        <input
          type="text"
          id="level"
          name="level"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div className="text-end">
        <button
          type="submit"
          className="rounded-lg w-full max-w-32 bg-blue-500 text-white transition-colors hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </form>
  );
}
