import FileChooser from "@/app/ui/FileChooser";

export default function ContactsForm() {
  return (
    <div className="flex flex-col gap-y-5">
      <div>
        <label htmlFor="contact-type">Type</label>
        <input
          type="text"
          id="contact-type"
          name="contact-type"
          className="block border-2 rounded-xl text-sm px-3 w-full"
        />
      </div>
      <div>
        <label
          htmlFor="contact"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Contact
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
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
