import { fetchUserByID } from "@/app/lib/data";
import ContactsTable from "@/app/ui/singleUser/tables/ContactsTable";
import EducationTable from "@/app/ui/singleUser/tables/EducationTable";
import LanguagesTable from "@/app/ui/singleUser/tables/LanguagesTable";
import ProjectsTable from "@/app/ui/singleUser/tables/ProjectsTable";
import SkillsTable from "@/app/ui/singleUser/tables/SkillsTable";
import UserAbout from "@/app/ui/singleUser/UserAbout";
import UserAvatar from "@/app/ui/singleUser/UserAvatar";
import UserName from "@/app/ui/singleUser/UserName";
import AvatarSkeleton from "@/app/ui/skeletons/AvatarSkeleton";
import TableSkeleton from "@/app/ui/skeletons/TableSkeleton";
import UserInfoSkeleton from "@/app/ui/skeletons/UserInfoSkeleton";
import { Suspense } from "react";

export default async function SingleUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await fetchUserByID(params.id);

  return (
    <div>
      <div className="flex justify-around shadow-md rounded-lg p-5">
        <Suspense fallback={<AvatarSkeleton />}>
          <UserAvatar
            avatar_url={user.avatar_url}
            userid={user.id}
            imageAlt={user.name}
          />
        </Suspense>
        <div>
          <Suspense fallback={<UserInfoSkeleton />}>
            <UserName userId={user.id} username={user.name} />
          </Suspense>
        </div>
      </div>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">About me</h3>
        <UserAbout userid={user.id} userabout={user.about} />
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Education</h3>
        <Suspense fallback={<TableSkeleton />}>
          <EducationTable userid={params.id} />
        </Suspense>
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Skills</h3>
        <Suspense fallback={<TableSkeleton />}>
          <SkillsTable userid={params.id} />
        </Suspense>
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Projects</h3>
        <Suspense fallback={<TableSkeleton />}>
          <ProjectsTable userid={params.id} />
        </Suspense>
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Contacts</h3>
        <Suspense fallback={<TableSkeleton />}>
          <ContactsTable userid={params.id} />
        </Suspense>
      </section>
      <section className="shadow-md rounded-lg p-5 mt-12">
        <h3 className="text-center text-2xl">Languages</h3>
        <Suspense fallback={<TableSkeleton />}>
          <LanguagesTable userid={params.id} />
        </Suspense>
      </section>
    </div>
  );
}
