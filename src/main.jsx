import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./screens/home";
import Signup from "./screens/signup";
import Login from "./screens/login";
import Forgot from "./screens/forgot";
import Reset from "./screens/reset";
import Chat from "./screens/chat";
import PrivateRoute from "./components/protected";
import NotFound from "./screens/not-found";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} errorElement={<NotFound />} />
      <Route path="signup" element={<Signup />} errorElement={<NotFound />} />
      <Route path="login" element={<Login />} errorElement={<NotFound />} />
      <Route path="forgot" element={<Forgot />} errorElement={<NotFound />} />
      <Route path="reset" element={<Reset />} errorElement={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path="chat" element={<Chat />} errorElement={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
