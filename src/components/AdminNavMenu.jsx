import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function AdminNavMenu() {
  return (
    <div className="w-full flex justify-center items-center text-nord-0 mt-4">
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
            <NavigationMenuContent className="text-nord-0">
              <NavigationMenuLink href="/admin/overview">Sales</NavigationMenuLink>
              <NavigationMenuLink href="/admin/employee-stats">Employees</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="text-nord-0">
              <NavigationMenuLink href="/admin/menu">View Menu</NavigationMenuLink>
              <NavigationMenuLink href="/admin/edit-menu">Edit Menu</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <NavigationMenuTrigger>Employees</NavigationMenuTrigger>
            <NavigationMenuContent className="text-nord-0">
              <NavigationMenuLink href="/admin/employess">Employees</NavigationMenuLink>
              <NavigationMenuLink href="/admin/register-employee">Add Employee</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
