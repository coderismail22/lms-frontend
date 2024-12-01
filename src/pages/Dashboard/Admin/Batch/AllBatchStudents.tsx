import { useParams } from "react-router-dom";

const AllBatchStudents = () => {
  const { batchId } = useParams();
  return (
    <div>
      AllBatchStudents
      <p>{batchId}</p>
    </div>
  );
};

export default AllBatchStudents;
