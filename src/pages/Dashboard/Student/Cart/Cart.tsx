import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import { queryClient } from "@/queryClientSetup";

// Mock fetchCartItems function
const fetchCartItems = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          {
            _id: "1",
            batchId: {
              _id: "batch1",
              batchName: "Batch 1",
              batchImg: "https://via.placeholder.com/150",
            },
            courseId: {
              _id: "course1",
              name: "Course 1",
            },
            price: 2000,
            quantity: 1,
          },
          {
            _id: "2",
            batchId: {
              _id: "batch2",
              batchName: "Batch 2",
              batchImg: "https://via.placeholder.com/150",
            },
            courseId: {
              _id: "course2",
              name: "Course 2",
            },
            price: 3500,
            quantity: 2,
          },
        ],
      });
    }, 500)
  );
};

// Mock removeCartItem function
const removeCartItem = async (cartItemId: string) => {
  console.log(`Mock remove cart item: ${cartItemId}`);
  return Promise.resolve();
};

// Mock updateCartItemQuantity function
const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}) => {
  console.log(`Mock update quantity: ${cartItemId} to ${quantity}`);
  return Promise.resolve();
};

const Cart = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      Swal.fire("Removed!", "Item removed from cart.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to remove item.", "error");
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to update quantity.", "error");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-6 w-1/2 mb-4" />
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load cart items.</div>;
  }

  const cartItems = data?.data || [];
  const totalCost = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (cartItemId: string) => {
    removeMutation.mutate(cartItemId);
  };

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      Swal.fire("Error", "Quantity must be at least 1.", "error");
      return;
    }
    updateQuantityMutation.mutate({ cartItemId, quantity });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire("Error", "Your cart is empty.", "error");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value))
                  }
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
