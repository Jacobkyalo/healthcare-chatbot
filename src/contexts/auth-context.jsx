/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import { account } from "../appwrite";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupUser = async (email, password, name) => {
    try {
      setLoading(true);
      await account.create(ID.unique(), email, password, name);
      setLoading(false);
      await account.createEmailSession(email, password);

      let accountDetails = await account.get();
      setUser(accountDetails);

      toast.success("Account created successfully");
      navigate("/chat");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      setLoading(false);

      let accountDetails = await account.get();
      setUser(accountDetails);

      toast.success("Login successful");
      navigate("/chat");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setLoading(false);
      setUser(null);
      localStorage.removeItem("cookieFallback");

      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const persistUser = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createPasswordRecovery = async (email) => {
    try {
      setLoading(true);
      await account.createRecovery(email, "http://localhost:5173/reset");
      setLoading(false);

      toast.success("Password recovery email sent to your email inbox or spam");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const updatePasswordRecovery = async (
    userId,
    secret,
    password,
    passwordAgain
  ) => {
    try {
      setLoading(true);
      await account.updateRecovery(userId, secret, password, passwordAgain);
      setLoading(false);

      toast.success("Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cookieFallback")) {
      persistUser();
    }
  }, []);

  const values = {
    user,
    loading,
    signupUser,
    loginUser,
    logoutUser,
    createPasswordRecovery,
    updatePasswordRecovery,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
