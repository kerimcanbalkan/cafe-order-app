import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {useAlert} from "@/components/AlertProvider";
import Loading from "@/components/Loading";
import { useCart } from "@/context/cart";
import { useParams } from "react-router-dom";
import { postOrder } from "../api/order";
import {useOrder} from "@/context/order";


export default function PlaceOrderButton(){
  const showAlert = useAlert();
  const {cart, clearCart} = useCart();
  const { tableNumber } = useParams();
  const { refetchOrder } = useOrder();

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
      refetchOrder();
      clearCart();
    },
  });

  const handlePlaceOrder = () => {
    mutation.mutate({cart, tableNumber});
    console.log("This is cart", cart, "This is table number", tableNumber);
  }
  
  return (
    <Button className="bg-nord-14 text-white text-lg hover:bg-nord-12 transition-transform duration-200 ease-in-out active:scale-90 focus:scale-100" disabled={mutation.isLoading} onClick={handlePlaceOrder}>
      {mutation.isPending ? <Loading/> : 'Place Order'}
    </Button>
  )
}
