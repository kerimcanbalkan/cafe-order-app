import {AlertProvider} from "@/components/AlertProvider";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({navMenu}){
  return (
      <AlertProvider>
        <main className="container mx-auto p-4">
          <DashboardNavbar/>
          <main>
            {navMenu}
            <Outlet/>
          </main>
        </main>
      </AlertProvider>
  );
}
