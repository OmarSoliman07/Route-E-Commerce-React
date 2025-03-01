import { Link } from "react-router-dom";
import notfound from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 dark:bg-dark-bg dark:text-gray-100 px-4 text-center">
      <img src={notfound} alt="Not Found" className="max-w-xs sm:max-w-md lg:max-w-lg w-full" />
      <p className="text-lg sm:text-xl md:text-2xl mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 w-full sm:w-auto bg-unhover-button text-white text-lg font-semibold rounded-lg shadow-md hover:bg-main transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
