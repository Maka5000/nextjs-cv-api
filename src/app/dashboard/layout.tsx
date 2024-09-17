import NavBar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto lg:flex shadow-2xl md:rounded-2xl overflow-hidden border-solid border-x-2">
      <NavBar />
      <div className="w-full md:p-12 pt-12">{children}</div>
    </div>
  );
}
