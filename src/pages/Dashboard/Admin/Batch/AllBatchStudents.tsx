import { useParams } from "react-router-dom";
import AllStudents from "./AllBatchStudents/AllStudents";

const AllBatchStudents = () => {
  const { batchId } = useParams();
  if (!batchId) return <div>Batch ID is not available</div>;

  return (
    <div>
      <p className="text-center font-bold text-2xl underline underline-offset-8">
        All Students
      </p>
      <AllStudents batchId={batchId} />
    </div>
  );
};

export default AllBatchStudents;
