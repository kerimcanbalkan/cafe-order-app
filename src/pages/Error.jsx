import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";

export default function Error() {
  return (
    <div
      className="container mx-auto w-full h-svh flex flex-col items-center justify-center"
    >
      <CircleAlert className="text-nord-11 mb-1" size={150}/>
      <h1 className="text-nord-1 font-bold text-2xl mb-3">Oops Something Went Wrong</h1>
      <Button
        className="bg-nord-9 rounded-lg text-white text-lg p-5 active:scale-50 transition"
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh page
      </Button>
    </div>
  ); 
}
