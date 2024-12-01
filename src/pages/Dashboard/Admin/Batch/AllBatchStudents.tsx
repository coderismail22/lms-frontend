import { useParams } from "react-router-dom";
import AllStudents from "./AllBatchStudents/AllStudents";

const AllBatchStudents = () => {
  const { batchId } = useParams();
  return (
    <div>
      AllBatchStudents
      <p>{batchId}</p>
      <AllStudents batchId={batchId} />
    </div>
  );
};

export default AllBatchStudents;
