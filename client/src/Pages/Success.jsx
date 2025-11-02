import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // lightweight icon
import Button from "../Components/Button";

export default function Success() {
  const navigate = useNavigate();
 const handleBack = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";
    localStorage.removeItem("lastPath");
    navigate(lastPath);
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-sm w-full">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment was processed successfully.
        </p>
        <Button variant="success" onClick={handleBack}>Go Back</Button>

      
      </div>
    </div>
  );
}
