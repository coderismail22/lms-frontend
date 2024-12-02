import { useParams } from "react-router-dom";
import AllStudents from "./AllBatchStudents/AllStudents";

const AllBatchStudents = () => {
  const { batchId } = useParams();
  if (!batchId) return <div>Batch ID is not available</div>;

  return (
    <div>
      AllBatchStudents
      <p>{batchId}</p>
      <AllStudents batchId={batchId} />
    </div>
  );
};

export default AllBatchStudents;
