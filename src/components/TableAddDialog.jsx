import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { createTable } from "@/api/table";
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
import Loading from "@/components/Loading";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export default function TableAddDialog({ open, setOpen, refetch }) {
  const showAlert = useAlert();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const mutation = useMutation({
    mutationFn: (table) => createTable(table),
    onError: (error) => {
      console.error("Error creating table:", error);
      showAlert("error", "Error!", "Could not create the table");
    },
    onSuccess: () => {
      refetch?.();
      showAlert("success", "Success!", "Table created successfully");
      setOpen(false);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create table</DialogTitle>
          <DialogDescription>
            Add a new table to the restaurant
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="table-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Table 1, Balcony A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
              form.reset();
            }}
            className="bg-nord-11"
          >
            Cancel
          </Button>
          <Button type="submit" form="table-form" className="bg-nord-14">
            {mutation.isPending ? <Loading /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
