import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
/**
 * Renders an alert component for notification permissions 
 * @param {Object} props - The component props.
 * @param {function(): void} props.enableFunc - Function that runs when allow button is clicked.
 * @param {function(): void} props.disableFunc - Function that runs when don't button is clicked.
**/
export default function NotificationAlert({enableFunc, disableFunc}) {
  return (
     <Alert variant="default" className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-80">
       <AlertTitle>Notifications</AlertTitle>
       <AlertDescription>
         You should allow notifications to receive notification whenever new order is made.
       </AlertDescription>
       <div className="flex gap-2 mt-2">
        <Button onClick={enableFunc} className="text-white bg-nord-14 text-xs h-8">Allow</Button>
        <Button onClick={disableFunc} className="text-white bg-nord-11 text-xs h-8">Don't</Button>
       </div>
      </Alert>
  )
}
