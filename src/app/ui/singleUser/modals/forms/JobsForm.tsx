export default function JobsForm() {
  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          className="block border-2 rounded-xl text-sm px-3 w-full"
        />
      </div>
      <div>
        <label
          htmlFor="position"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <label
          htmlFor="experience"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Experience
        </label>
        <input
          type="text"
          id="experience"
          name="experience"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
    </div>
  );
}
