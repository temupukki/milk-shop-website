import DashboardFooter from "@/components/Dashboard-footer";
import Dashboard from "@/components/Dashboard-nav-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Dashboard />
      {children}
      <DashboardFooter/>
    </div>
  );
}
