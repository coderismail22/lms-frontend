import AppDashboard from "@/components/DashboardAndSidebar/AppDashboard";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <div className="h-100vh overflow-auto ">
      <Helmet>
        <title>EJobsIT | Dashboard</title>
      </Helmet>
      <AppDashboard />
    </div>
  );
};

export default Dashboard;
