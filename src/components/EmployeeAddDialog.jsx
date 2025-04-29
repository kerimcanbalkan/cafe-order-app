import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/user";
import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(3, "Name should be at least 2 characters").max(20,"Name should be less than 20 characters"),
  surname: z.string().min(3, "Surname should be at least 2 characters").max(20, "Surname should be less than 20 characters"),
  gender: z.enum(["male", "female"], { message: "Gender must be 'male' or 'female'" }),
  username: z.string().min(3, "Username should be at least 3 characters").max(20, "Username should be less than 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 6 characters"),
  role: z.enum(["admin", "waiter", "cashier"], { message: "Role must be 'admin', 'waiter' or 'cashier'" }),
});

export default function EmployeeAddDialog({ open, setOpen, refetch }) {
  const showAlert = useAlert();
  const token = localStorage.getItem("authToken");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      gender: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ token, user }) => createUser({ token, user }),
    onError: (error) => {
      console.error("Error adding employee:", error);
      showAlert("error", "Error!", "Could not add the employee");
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "Employee added successfully");
      form.reset();
      setOpen(false);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    mutation.mutate({ token, user: data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add employee</DialogTitle>
          <DialogDescription>Create a new employee account</DialogDescription>
          <Form {...form}>
            <form
              id="employee-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-left"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="waiter">Waiter</option>
                        <option value="cashier">Cashier</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="text-white bg-nord-11 hover:bg-nord-11 hover:text-white"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-nord-14 hover:bg-nord-14"
            type="submit"
            form="employee-form"
          >
            {mutation.isPending ? <Loading /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
