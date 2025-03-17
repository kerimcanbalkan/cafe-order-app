import { Outlet } from "react-router-dom";
import {AlertProvider} from "@/components/AlertProvider";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout(){
  return (
      <AlertProvider>
        <main className="container mx-auto">
          <DashboardNavbar/>
          <Outlet/>
        </main>
      </AlertProvider>
  );
}
