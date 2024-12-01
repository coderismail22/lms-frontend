// orderColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiDotsVertical } from "react-icons/bi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { TOrder } from "./order.type";

export const orderColumns = (
  handleEdit: (paymentId: string) => void,
  handleDelete: (paymentId: string) => void
): ColumnDef<TOrder>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Name
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    header: "Order ID",
    accessorKey: "_id", // Accessor key for order ID
  },
  {
    header: "Student Name",
    accessorKey: "userId.name", // Nested accessor for user ID
  },
  {
    header: "Email",
    accessorFn: (row) => row.userId?.email, // Safely access nested email field
    id: "userId.email",
    filterFn: "includesString", // Use string filtering
  },
  {
    header: "Total Amount",
    accessorKey: "paymentId.amount", // Assuming there's a totalAmount field
  },
  {
    header: "Order Time",
    accessorKey: "createdAt", // Assuming there's a createdAt field for order date
  },
  {
    header: "Order Status",
    accessorKey: "orderStatus", // Order status (pending, completed, etc.)
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const paymentId = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <BiDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(paymentId)}>
              <FaRegEdit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(paymentId)}>
              <FaTrash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
