import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header className="py-4 flex flex-wrap gap-8 items-center justify-between">
      <Link to="/">
        <h1 className="font-bold text-3xl">
          Healthcare
          <span className="text-orange-600">Chatbot</span>
        </h1>
      </Link>
      {user ? (
        <>
          <Link
            to="/chat"
            className="bg-orange-600 px-6 py-3 text-white text-sm rounded-full"
          >
            Dashboard
          </Link>
        </>
      ) : (
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link to="/signup" className="hover:text-orange-600">
                Get started
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-600">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
