// paymentColumns.tsx
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

export type TPayment = {
  _id: string;
  userId: string;
  name: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  payerNumber: string;
  payeeNumber: string;
};

export const paymentColumns = (
  handleEdit: (paymentId: string) => void,
  handleDelete: (paymentId: string) => void
): ColumnDef<TPayment>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
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
  //   {
  //     accessorKey: "name",
  //     header: "Name",
  //   },
  {
    accessorKey: "payerNumber",
    header: "From",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
  },
  {
    accessorKey: "transactionId",
    header: "TID",
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
