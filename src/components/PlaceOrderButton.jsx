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
  const {addToOrder}  = useOrder();
  
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
      addToOrder(cart);
      clearCart();
      console.log("success order posted");
    },
  });

  const handlePlaceOrder = () => {
    mutation.mutate({cart, tableNumber});
    console.log("This is cart", cart, "This is table number", tableNumber);
  }
  
  return (
    <Button className="bg-nord-14 text-white text-lg hover:bg-nord-12 active:scale-50 transition" disabled={mutation.isLoading} onClick={handlePlaceOrder}>
      {mutation.isLoading ? <Loading/> : 'Place Order'}
    </Button>
  )
}
