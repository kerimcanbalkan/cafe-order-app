import { LoginForm } from "@/components/LoginForm";
import { AlertProvider } from "@/components/AlertProvider";

export default function Login() {
  return (
    <div class="container mx-auto flex justify-center items-center h-svh">
      <AlertProvider>
        <LoginForm/>
      </AlertProvider>
    </div>
  )
}
