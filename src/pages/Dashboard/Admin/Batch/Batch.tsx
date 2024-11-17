import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Batch = () => {
  return (
    <div>
      <div className="flex justify-end">
        <Link to={"/dashboard/admin/batch/add-batch"}>
          <Button>Add Batch</Button>
        </Link>
      </div>
      <div>
        <h1>Batch Cards</h1>
      </div>
    </div>
  );
};

export default Batch;
