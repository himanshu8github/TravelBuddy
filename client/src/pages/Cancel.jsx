import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-600">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Failed or Canceled</h1>
      <p className="text-lg">Your subscription was not completed. Please try again later.</p>
      <Link to="/dashboard" className="mt-6 text-blue-500 underline">Go to Dashboard</Link>
    </div>
  );
};

export default Cancel;
