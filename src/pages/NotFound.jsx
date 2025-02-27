import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound({ className }) {
  const navitage = useNavigate();
  return (
    <div
      className={`"container mx-auto w-full h-svh flex flex-col items-center justify-center ${className}`}
    >
      <h1 className="text-nord-11 font-bold text-[10em]">404</h1>
      <p className="text-nord-1 text-lg mb-4">Page not found!</p>
      <Button
        className="bg-nord-1 hover:bg-nord-3 rounded-lg text-nord-4 text-xl p-5"
        onClick={() => {
          navitage("/");
        }}
      >
        Home Page
      </Button>
    </div>
  );
}
