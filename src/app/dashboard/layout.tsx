import NavBar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto flex shadow-2xl rounded-2xl overflow-hidden border-solid border-x-2">
      <NavBar />
      <div className="w-full p-12">{children}</div>
    </div>
  );
}
