import { Metadata } from "next";
import InfoChip from "../ui/dashboard/InfoChip";
import { fetchCardData } from "../lib/data";

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
      <section className="mt-10">
        <div>This page was created using</div>
      </section>
    </div>
  );
}
