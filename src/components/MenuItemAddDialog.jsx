import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { addMenuItem } from "@/api/menu";
import Loading from "@/components/Loading";
import { useAlert } from "@/components/AlertProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
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
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name should be at least 2 characters" }),
  description: z.string().min(5, { message: "Description should be at least 5 characters" }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number and bigger than 0",
  }),
  category: z.string().min(2, { message: "Category should be at least 2 characters" }),
    image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg and .png formats are supported."
    )
});

export default function MenuItemAddDialog({open, setOpen, refetch}) {
  const showAlert = useAlert();
  const token = localStorage.getItem("authToken");
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    },
  });

  const mutation = useMutation({
    mutationFn: ({token, menuItem}) => {
      return addMenuItem({token, menuItem});
    },
    onError: (error) => {
      console.error("Error adding item:", error);
      showAlert("error", "Error!", "Could not the item");
    },
    onSuccess: () => {
      refetch();
      showAlert("success", "Success!", "Item added succesfully");
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", data.image);

    mutation.mutate({token: token, menuItem: formData});
    console.log("Creating menu item ", formData);

    form.reset();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add menu item</DialogTitle>
          <DialogDescription>
           Create and add a menu item to the menu
          </DialogDescription>
            <Form {...form}>
              <form
                id="menu-item-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 text-left">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="1.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...fieldProps}
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={(event) =>
                            {
                              console.log(event.target.files[0]);
                              onChange(event.target.files && event.target.files[0]);
                            }
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
        </DialogHeader>
        <DialogFooter>
          <Button className="text-white bg-nord-11 hover:bg-nord-11 hover:text-white" onClick={
            () => {
              setOpen(false);
            }
          }>Cancel</Button>
          <Button className="text-white bg-nord-14 hover:bg-nord-14" type="submit" form="menu-item-form">
            {mutation.isPending ? <Loading/> : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
