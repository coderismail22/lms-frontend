import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

interface BatchCardProps {
  image: string;
  courseName: string;
  batch: number;
  batchID: string;
  onEdit: () => void;
  onDelete: () => void;
  onViewStudents: () => void;
}

const BatchCard: React.FC<BatchCardProps> = ({
  image,
  courseName,
  batch,
  batchID,
  onEdit,
  onDelete,
  onViewStudents,
}) => {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={image}
          alt={courseName}
          className="w-full h-36 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800">{courseName}</h2>
        <p className="text-sm text-gray-600">
          <strong>Batch:</strong> {batch}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Batch ID:</strong> {batchID}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Button variant="default" onClick={onViewStudents}>
          All Students
        </Button>
        <Button variant="secondary" onClick={onEdit}>
          Edit Batch
        </Button>
        <Button
          variant="ghost"
          className="text-red-500 hover:bg-red-100"
          onClick={onDelete}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BatchCard;
