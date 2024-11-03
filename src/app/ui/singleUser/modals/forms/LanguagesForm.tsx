export default function LanguagesForm() {
  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <label
          htmlFor="language"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Language
        </label>
        <input
          type="text"
          id="language"
          name="language"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
      <div>
        <label
          htmlFor="languageLevel"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Level
        </label>
        <input
          type="text"
          id="languageLevel"
          name="languageLevel"
          className="block border-2 rounded-xl text-sm px-3 w-full"
          required
        />
      </div>
    </div>
  );
}
