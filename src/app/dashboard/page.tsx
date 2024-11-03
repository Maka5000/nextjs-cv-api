import { Metadata } from "next";
import InfoChip from "../ui/dashboard/InfoChip";
import { fetchCardData } from "../lib/data";
import UsageUsers from "../ui/dashboard/usage-items/UsageUsers";
import UsageEducations from "../ui/dashboard/usage-items/UsageEducations";
import UsageSkills from "../ui/dashboard/usage-items/UsageSkills";
import UsageProjects from "../ui/dashboard/usage-items/UsageProjects";
import UsageContacts from "../ui/dashboard/usage-items/UsageContacts";
import UsageLanguages from "../ui/dashboard/usage-items/UsageLanguages";
import UsageJobs from "../ui/dashboard/usage-items/UsageJobs";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const cardData = await fetchCardData();

  return (
    <div className="text-center">
      <h2 className="text-5xl">Info</h2>
      <section className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-3 mt-5">
        {cardData.map((data, index) => (
          <InfoChip
            key={index}
            imageURL={`/images/dashboard/${data.name}.svg`}
            count={data.count}
            chipTitle={data.name}
          />
        ))}
      </section>
      <section className="mt-10 text-left">
        <div className="text-center">
          This project was created to make creation of my cv websites easier.
        </div>
        <div>
          <h2 className="font-bold text-center text-3xl pt-10">Usage</h2>
          <div className="flex flex-col gap-y-9">
            <UsageUsers />
            <UsageEducations />
            <UsageSkills />
            <UsageProjects />
            <UsageContacts />
            <UsageLanguages />
            <UsageJobs />
          </div>
        </div>
      </section>
    </div>
  );
}
