import { createContext, useContext, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    setTimeout(() => setAlert(null), 2000);
  };
  
  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-80">
          <Alert
            className={cn("shadow-sm", {
              "bg-nord-14 text-white": alert.type === "success",
              "bg-nord-11 text-white": alert.type === "error",
              "bg-nord-1 text-white": alert.type === "info",
            })}
          >
            {alert.type === "success" && <CheckCircle className="h-5 w-5 text-white" />}
            {alert.type === "error" && <XCircle className="h-5 w-5 text-white" />}
            {alert.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription className="text-white">{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
