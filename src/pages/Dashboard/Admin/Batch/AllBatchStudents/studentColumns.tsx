// studentColumns.tsx
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
// import { ArrowUpDown } from "lucide-react";
import { TStudent } from "./student.type";
import { RxCrossCircled } from "react-icons/rx";
import { FaSquareArrowUpRight } from "react-icons/fa6";
// import moment from "moment"; // Import moment.js

export const studentColumns = (
  handleBlock: (studentId: string) => void,
  handleUnblock: (studentId: string) => void,
  handleDelete: (studentId: string) => void
): ColumnDef<TStudent>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "_id",
    header: "Student ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const studentId = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <BiDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleBlock(studentId)}>
              <FaSquareArrowUpRight className="text-green-700" /> Full Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUnblock(studentId)}>
              <RxCrossCircled className="text-red-500" /> Block
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(studentId)}>
              <FaSquareArrowUpRight className="text-green-700" /> Unblock
            </DropdownMenuItem>

            <DropdownMenuItem
            // onClick={() => handleDelete(paymentId)}
            >
              <FaTrash className="text-red-500" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
