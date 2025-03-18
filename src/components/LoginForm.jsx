import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useEffect, useState} from "react";
import { useAlert } from "@/components/AlertProvider";
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/auth";
import { useUser } from "@/context/user";

export function LoginForm({
  className,
  ...props
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showAlert = useAlert();
  const navigate = useNavigate();
  const {user} = useUser();
  const {authed, login} = useAuth();

  const navigateUser = (role) => {
      switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "waiter":
        navigate("/waiter");
        break;
      case "cashier":
        navigate("/cashier");
        break;
      }
  }


useEffect(() => {
  if (authed) {
        navigateUser(user.role);
  }
  },[authed, user])

  const mutation = useMutation({
    mutationFn: () => { login(username,password) },
    onSuccess: () => {navigateUser(user.Role)},
    onError: () => {
      showAlert("error", "Error!", "Wrong username or password.");
      setUsername("");
      setPassword("");
    },
    retry: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };
  
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden w-80">
        <CardContent className="grid p-0 ">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-nord-10">Welcome back</h1>
                <p className="text-balance text-nord-">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-nord-0">Username</Label>
                <Input className="placeholder:text-nord-4"
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-nord-0">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-nord-10 text-white" disabled={mutation.isPending}>
                {mutation.isPending ? <Loading/> : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
