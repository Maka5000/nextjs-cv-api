export default function SkillsForm() {
  return (
    <div className="flex flex-col gap-y-5">
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
    </div>
  );
}
