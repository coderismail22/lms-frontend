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
import { FaTrash } from "react-icons/fa";
import { ArrowUpDown } from "lucide-react";
import { TOrder } from "./order.type";
import { RxCrossCircled } from "react-icons/rx";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import moment from "moment"; // Import moment.js

export const orderColumns = (
  handleApprove: (paymentId: string) => void,
  handleDecline: (paymentId: string) => void,
  handleDelete: (paymentId: string) => void
): ColumnDef<TOrder>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "userId.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
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
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string; // Get the order creation time
      return moment(createdAt).format("D-MM-YYYY, h:mm:ss a"); // Format the date using Moment.js
    },
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
            <DropdownMenuItem onClick={() => handleApprove(paymentId)}>
              <FaSquareArrowUpRight className="text-green-700" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDecline(paymentId)}>
              <RxCrossCircled className="text-red-500" /> Decline
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(paymentId)}>
              <FaTrash className="text-red-500" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
