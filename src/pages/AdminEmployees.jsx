import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import EmployeeCard from "@/components/EmployeeCard";
import EmployeeDetailsDialog from "@/components/EmployeeDetailsDialog";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import EmployeeAddDialog from "../components/EmployeeAddDialog";

export default function AdminEmployees(){
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [userAddOpen, setUserAddOpen] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);
  const token = localStorage.getItem("authToken");

  const handleAdd = () => {
    setUserAddOpen(true);
  }

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getAllUsers({ token }),
  });

  const allUsers = users?.data || [];
  const sortedUsers = allUsers.sort((a, b) => a.role.localeCompare(b.role));

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  
  if (error)
    return (
      <div className="container mx-auto h-svh">
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
          <h3 className="text-nord-11 text-lg">Could not get the Data</h3>
          <Button
            className="bg-nord-11 hover:bg-nord-1 text-white rounded-lg active:scale-95 transition"
            onClick={() => {
              refetch();
            }}
          >
             Retry
          </Button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex justify-end items-center border-b-1 border-nord-4 p-2 mb-5">
        <CirclePlus onClick={handleAdd} size={28} className="text-nord-10 transition-transform duration-200 ease-in-out 
        active:scale-90 focus:scale-100"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
              
        {sortedUsers.map((user, index) => (
          <EmployeeCard key={index} user={user} setUser={setClickedUser} setOpenDetails={setUserDetailsOpen}/>
        ))}

        {clickedUser && (
          <EmployeeDetailsDialog open={userDetailsOpen} setOpen={setUserDetailsOpen} user={clickedUser} refetch={refetch}/>
        )}

        {userAddOpen && (
          <EmployeeAddDialog open={userAddOpen} setOpen={setUserAddOpen} refetch={refetch}/>
        )}
      </div>
    </div>
  )
}
