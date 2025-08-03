import { Link } from "react-router-dom";


const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-green-600">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg">Thank you for subscribing to the Pro Plan.</p>
      <Link to="/dashboard" className="mt-6 text-blue-500 underline">Go to Dashboard</Link>
    </div>
  );
};

export default Success;
