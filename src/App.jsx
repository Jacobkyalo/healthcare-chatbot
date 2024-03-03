import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/auth-context";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthContextProvider>
      <div className="container mx-auto px-4">
        <ToastContainer />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}
