import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

/**
 * Renders a clickable employee card that opens a details dialog.
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user details.
 * @param {string} props.user.id - The employee id.
 * @param {string} props.user.name - The employee name.
 * @param {string} props.user.surname - The employee surname.
 * @param {number} props.user.gender - The employee gender.
 * @param {string} props.user.email - The employee email.
 * @param {string} props.user.username - The username of the employee.
 * @param {string} props.user.role - The employee role.
 * @param {string} props.user.createdAt - The employee user creation date.
 * @param {function(boolean): void} props.setOpenDetails - For sharing the open state of the EmployeeDetailsDialog with the parent component.
  * @param {function(user): void} props.setUser - For sharing the user state with the EmployeeDetailsCard
 */
export default function EmployeeCard({ user, setUser, setOpenDetails }){
  
  return (
    <>
      <Card
        className={`rounded-lg overflow-hidden shadow-sm ${getShadowClass(user.role)} hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer`}
        onClick={() => {
          setUser(user);
          setOpenDetails(true);
        }}
      >
        <CardContent className="p-4 flex flex-col ">
          <CardTitle className="text-lg font-semibold text-nord-0">
            {`${user.name} ${user.surname}`}
          </CardTitle>
          <CardDescription className="text-nord-0">
            <p><span className="font-bold">Role: </span>{capitalize(user.role)}</p>
            <p><span className="font-bold">Gender: </span>{capitalize(user.gender)}</p>
            <p><span className="font-bold">Email: </span>{user.email}</p>
            <p><span className="font-bold">Started At: </span>{new Date(user.createdAt).toLocaleString("en-GB")}</p>
          </CardDescription>
        </CardContent>
        </Card>
    </>  
  );
}

const getShadowClass = (role) => {
  switch (role) {
  case 'admin':
    return 'shadow-nord-11';
  case 'waiter':
    return 'shadow-nord-10';
  case 'cashier':
    return 'shadow-nord-14';
  default:
    return 'shadow';
  }
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
