export default function EducationForm() {
  return (
    <div className="flex flex-col gap-y-5">
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
        <label
          htmlFor="program"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Program
        </label>
        <input
          type="text"
          id="program"
          name="program"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
        <span id="program-subtitle" className="hidden text-sm text-red-500">
          Please fill this field
        </span>
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
    </div>
  );
}
