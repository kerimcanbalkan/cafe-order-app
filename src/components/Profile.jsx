import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";


export default function Profile(){
  const navigate = useNavigate();
  const {logout} = useAuth();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer"><CircleUserRound size={26} className="text-nord-10"/></DropdownMenuTrigger>
      <DropdownMenuContent className="text-nord-0">
        <DropdownMenuItem onClick={() => {navigate("#")}}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
