import { useRouteError } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-8">
      <h1 className="text-6xl font-extrabold text-red-700 mb-4">Oops!</h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-base md:text-lg text-gray-500 italic">
        {error?.statusText || error?.message || "Unknown error"}
      </p>

      <div className="absolute top-8 left-8">
        <ArrowLeft
          className="w-8 h-8 text-gray-700 hover:text-gray-800 cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
