import Profile from "@/components/Profile";

export default function DashboardNavbar({className}) {
  return (
    <div className={`flex justify-between items-center p-4 ${className}`}>
      <h1 className="uppercase text-2xl text-nord-0 cursor-pointer">CAFE</h1>
      <Profile/>
     </div>
  )
}
