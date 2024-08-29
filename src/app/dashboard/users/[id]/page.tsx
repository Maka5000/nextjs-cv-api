import { fetchUserByID } from "@/app/lib/data";
import ContactsTable from "@/app/ui/singleUser/tables/ContactsTable";
import EducationTable from "@/app/ui/singleUser/tables/EducationTable";
import LanguagesTable from "@/app/ui/singleUser/tables/LanguagesTable";
import ProjectsTable from "@/app/ui/singleUser/tables/ProjectsTable";
import SkillsTable from "@/app/ui/singleUser/tables/SkillsTable";

export default async function SingleUserPage({ params } : { params : {id : string} }) {

  const user = await fetchUserByID(params.id);

  return (
    <div>
      <div className="flex justify-around shadow-md rounded-lg p-5">
        <img
          className="w-full max-w-44"
          src={`${user.avatar_url}`}
          alt="defaultavatar Vecteezy.com"
          title="Vecteezy.com"
        />
        <div>
          <h2 className="text-4xl">{ user.name }</h2>
          <span> id: { user.id } </span>
        </div>
      </div>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">About me</h3>
        <p>
          { user.about }
        </p>
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Education</h3>
        <EducationTable userid={params.id} />
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Skills</h3>
        <SkillsTable />
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Projects</h3>
        <ProjectsTable />
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Contacts</h3>
        <ContactsTable />
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Languages</h3>
        <LanguagesTable />
      </section>
    </div>
  );
}
