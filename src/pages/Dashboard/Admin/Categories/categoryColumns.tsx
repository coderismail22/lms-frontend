import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiDotsVertical } from "react-icons/bi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { MdDeleteForever, MdDeleteOutline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

// You can use a Zod schema here if you want.
export type TCategory = {
  name: string;
  _id: string;
};

export const categoryColumns = (
  handleUpdate: (category: TCategory) => void,
  handleDelete: (categoryId: string) => void
): ColumnDef<TCategory>[] => [
  {
    accessorKey: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions", // Custom ID for the Actions column.
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original; // Access the full row data.
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <BiDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("edit clicked")}>
              <FaRegEdit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("delete clicked")}>
              <FaTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
