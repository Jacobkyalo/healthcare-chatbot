import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().required("Please provide a valid password"),
  })
  .required();

export default function Login() {
  const { user, loading, loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password, data.name);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);
  return (
    <main className="grid place-items-center items-center h-screen">
      <Link to="/">
        <h1 className="font-bold text-3xl">
          Healthcare
          <span className="text-orange-600">Chatbot</span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl mx-auto bg- p-4 rounded-xl shadow-2xl"
      >
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold text-black">
            Login to continue
          </h2>
          <p className="text-sm text-neutral-600">
            Please fill your details below
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="email">
            <span className="mb-1 block">Email address</span>
            <input
              {...register("email")}
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              autoComplete="on"
              className="w-full rounded border border-neutral-600 p-2 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
            />
            <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
              {errors.email?.message}
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="password">
            <span className="mb-1 flex items-center justify-between">
              <span>Password</span>
              <Link
                to="/forgot"
                className="text-sm text-orange-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </span>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="w-full rounded border border-neutral-600 p-2 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
            />
            <span className="mt-1 block text-sm text-red-600">
              {errors.password?.message}
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="my-4 w-full rounded bg-orange-600 py-2 text-base text-white"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <div className="mt-4 text-start">
          <span className="text-sm text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-orange-600 hover:underline">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}
