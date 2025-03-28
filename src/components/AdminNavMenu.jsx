import { NavLink } from "react-router-dom";

export default function AdminNavMenu() {
  return (
    <div className="mt-5 mb-5 border-nord-4 flex items-center justify-center p-1 shadow">
      <ul className="flex items-center justify-center gap-5">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `text-nord-11 ${isActive ? "border-b-2" : ""}`}
          >
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/menu"
            className={({ isActive }) => `text-nord-10 ${isActive ? "border-b-2" : ""}`}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/tables"
            className={({ isActive }) => `text-nord-12 ${isActive ? "border-b-2" : ""}`}
          >
            Tables
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `text-nord-13 ${isActive ? "border-b-2" : ""}`}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/employees"
            className={({ isActive }) => `text-nord-14 ${isActive ? "border-b-2" : ""}`}
          >
            Employees
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

