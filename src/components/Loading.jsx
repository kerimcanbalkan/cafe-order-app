import { LoadingSpinner } from "./ui/loading-spinner";

export default function Loading({className}) {
  return (
    <div className={`container mx-auto flex items-center justify-center w-full h-svh ${className}`}>
      <LoadingSpinner />
    </div>
  );
}
