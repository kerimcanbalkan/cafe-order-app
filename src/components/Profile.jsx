import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";


export default function Profile(){

  const {logout} = useAuth();
  
  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger><CircleUserRound className="text-nord-0" size={26} /></MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="text-md text-nord-0">
            <Link to="#">Profile</Link>
          </MenubarItem>
          <MenubarItem className="text-md text-nord-0" onClick={logout}>
            <Link to="#">Logout</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
