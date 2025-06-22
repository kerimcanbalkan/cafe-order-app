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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { currencies as curr } from "@/data/currencies";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name should be at least 2 characters" }),
  description: z.string().min(5, { message: "Description should be at least 5 characters" }),
  price: z
  .string()
  .refine((val) => {
    const num = Number(val);
    return Number.isInteger(num) && num > 0;
  }, {
    message: "Price must be a positive integer (in cents).",
  }),
  currency: z.string().min(3, {message: "Use valid ISO 4217 code"}).max(3, {message: "Use valid ISO 4217 code"}),
  category: z.string().min(2, { message: "Category should be at least 2 characters" }),
    image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 4MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg and .png formats are supported."
    )
});

/**
 * Displays form inside a dialog
 * @param {Object} props - The component props
 * @param {boolean} props.open - Controls whether the dialog is open
 * @param {function(boolean): void} props.setOpen - Function to toggler the dialog open state.
 * @param {function(): void} props.refetch - Function taken from the mutation to refetch the data from the parent
 */
export default function MenuItemAddDialog({open, setOpen, refetch}) {
  const showAlert = useAlert();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      currency: " ",
      image: null,
    },
  });

  const mutation = useMutation({
    mutationFn: (menuItem) => {
      return addMenuItem(menuItem);
    },
    onError: (error) => {
      console.error("Error adding item:", error);
      const message = error?.response?.data?.error || "Something went wrong while creating menu item. Please try again.";      
      showAlert("error", "Error!", message);
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
    formData.append("currency", data.currency);
    formData.append("category", data.category);
    formData.append("image", data.image);

    mutation.mutate(formData);
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
                        <Input type="number" step="1" placeholder="1.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(curr).map(([code, name]) => (
                              <SelectItem key={code} value={code}>
                                {code} – {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
