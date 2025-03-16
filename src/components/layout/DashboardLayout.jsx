import { Outlet } from "react-router-dom";
import {AlertProvider} from "@/components/AlertProvider";

export default function DashboardLayout(){
  return (
      <AlertProvider>
        <main className="container mx-auto">
          <Outlet/>
        </main>
      </AlertProvider>
  );
}
