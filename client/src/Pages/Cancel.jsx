import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  const navigate = useNavigate();

  const handleBack = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";
    localStorage.removeItem("lastPath");
    navigate(lastPath);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-sm w-full">
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Cancelled ❌
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again anytime.
        </p>
        <button
          onClick={handleBack} // Go back to your last page
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 cursor-pointer rounded-lg font-medium transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
