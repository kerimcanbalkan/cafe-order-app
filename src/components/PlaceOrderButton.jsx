import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {useAlert} from "@/components/AlertProvider";
import Loading from "@/components/Loading";
import { useCart } from "@/context/cart";
import { useParams } from "react-router-dom";
import { postOrder } from "../api/order";

export default function PlaceOrderButton(){
  const showAlert = useAlert();
  const {cart} = useCart();
  const { tableNumber } = useParams();
  
  const mutation = useMutation({
    mutationFn: (cart, tableNumber) => {
      return postOrder(cart,tableNumber);
    },
    onError: (error) => {
      console.error("Error placing order:", error);
      showAlert("error", "Error!", "Could not place the order!");
    },
    onSuccess: () => {
      showAlert("success", "Success!", "Order Placed Successfully");
      console.log("success order posted");
    },
  });

  const handlePlaceOrder = () => {
    mutation.mutate({cart, tableNumber});
    console.log("This is cart", cart, "This is table number", tableNumber);
  }
  
  return (
    <Button className="bg-nord-11 text-nord-6 text-lg hover:bg-nord-12 active:scale-50 transition" disabled={mutation.isLoading} onClick={handlePlaceOrder}>
      {mutation.isLoading ? <Loading/> : 'Place Order'}
    </Button>
  )
}
