import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";

interface BatchCardProps {
  image: string;
  courseName: string;
  batch: number;
  batchId: string;
  onEdit: () => void;
  onDelete: () => void;
  onViewStudents: () => void;
}

const BatchCard: React.FC<BatchCardProps> = ({
  image,
  courseName,
  batch,
  batchId,
  onEdit,
  onDelete,
  onViewStudents,
}) => {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md overflow-hidden font-siliguri">
      <img src={image} alt={courseName} className="w-full h-36 object-cover" />
      <CardContent className="p-4 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 ">{courseName}</h2>
        <p className="text-xl text-gray-600">
          <strong>{batch}</strong>
        </p>
        <p className="text-sm text-gray-600">
          <strong>BID:</strong> {batchId}
        </p>
      </CardContent>
      <div className="flex items-center justify-center gap-2 mb-5">
        <Button
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          variant="default"
          onClick={onViewStudents}
        >
          Students
        </Button>
        <Button
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          variant="default"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="default"
          className="text-white  hover:bg-red-100 bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          onClick={onDelete}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

export default BatchCard;
