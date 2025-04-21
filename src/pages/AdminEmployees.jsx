import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import EmployeeCard from "../components/EmployeeCard";

export default function AdminEmployees(){
  const token = localStorage.getItem("authToken");

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
      {sortedUsers.map((user, index) => (
        <EmployeeCard key={index} user={user}/>
      ))}
    </div>
  )
}
