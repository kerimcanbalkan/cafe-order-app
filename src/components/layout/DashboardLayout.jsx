import {AlertProvider} from "@/components/AlertProvider";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({children}){
  return (
      <AlertProvider>
        <main className="container mx-auto p-4">
          <DashboardNavbar/>
          <main>{children}</main>
        </main>
      </AlertProvider>
  );
}
