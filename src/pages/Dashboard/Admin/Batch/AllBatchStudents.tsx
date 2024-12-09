import { useParams } from "react-router-dom";
import AllStudents from "./AllBatchStudents/AllStudents";

const AllBatchStudents = () => {
  const { batchId } = useParams();
  if (!batchId) return <div>Batch ID is not available</div>;

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Batch Students
      </p>
      <AllStudents batchId={batchId} />
    </div>
  );
};

export default AllBatchStudents;
