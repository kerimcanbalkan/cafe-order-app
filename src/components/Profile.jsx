import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/user";


export default function Profile(){
  const navigate = useNavigate();
  const {logout} = useAuth();
  const {user} = useUser();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex gap-2"><span className="text-nord-0 hover:underline">{user?.name} {user?.surname}</span><CircleUserRound size={26} className="text-nord-10"/></DropdownMenuTrigger>
      <DropdownMenuContent className="text-nord-0">
        <DropdownMenuItem onClick={() => {navigate("profile")}}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
