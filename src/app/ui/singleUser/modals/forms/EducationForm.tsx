import { createEducation } from "@/app/lib/actions";

export default function EducationForm({ userid }: { userid: string }) {
  return (
    <form action={createEducation} className="flex flex-col gap-y-5">
      <input type="hidden" name="userid" value={userid} />
      <div>
        <label htmlFor="establishment">Establishment</label>
        <input
          type="text"
          id="establishment"
          name="establishment"
          className="block border-2 rounded-xl text-sm px-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="program">Program</label>
        <input
          type="text"
          id="program"
          name="program"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="degree">Degree</label>
        <input
          type="text"
          id="degree"
          name="degree"
          className="block border-2 rounded-xl text-sm px-3 w-full"
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
