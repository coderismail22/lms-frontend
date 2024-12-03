/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";

// Fetch cart items from backend
const fetchCartItems = async () => {
  const { data } = await axiosInstance.get("/carts"); // Backend GET /carts
  console.log(data);
  return data;
};

// Remove a cart item
const removeCartItem = async (cartItemId: string) => {
  await axiosInstance.delete(`/carts/${cartItemId}`); // Backend DELETE /carts/:cartItemId
};

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch cart items
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  // Mutation to remove an item
  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      Swal.fire("Removed!", "Item removed from cart.", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to remove item.";
      Swal.fire("Error", errorMessage, "error");
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-4" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <div className="p-6 text-red-500">Failed to load cart items.</div>;
  }

  const cartItems = data?.data || [];
  const totalCost = cartItems.reduce(
    // TODO: Add a type here
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // Handle remove action
  const handleRemove = (cartItemId: string) => {
    removeMutation.mutate(cartItemId);
  };

  // Handle checkout action
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire("Error", "Your cart is empty.", "error");
      return;
    }
    console.log("cartItems", cartItems);
    navigate("/dashboard/student/paymentpage");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Your Cart (Item)
      </h1>
      <h1 className="text-xl font-bold text-red-500 mb-6">
        Please don&apos;t add more than one item at a time *
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        // TODO: Add a type here
        {cartItems.map((item: any) => (
          <Card key={item._id} className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-600">
                {item.batchId.batchName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.batchId.batchImg}
                alt={item.batchId.batchName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700">Price: {item.price} BDT</p>
              <p className="text-gray-700">Course: {item.courseId.name}</p>
              <div className="flex items-center gap-2 mt-4">
                <Badge>Quantity</Badge>
                <Input
                  disabled
                  type="number"
                  value={item.quantity}
                  className="w-16"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-800">
          Total Cost: {totalCost} BDT
        </p>
        <Button onClick={handleCheckout} className="bg-green-500">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
