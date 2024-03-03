import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please provide your email address"),
  })
  .required();

export default function ForgotPassword() {
  const { loading, createPasswordRecovery } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await createPasswordRecovery(data.email);
  };

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
            Reset Your Password
          </h2>
          <p className="text-sm text-neutral-600">
            Enter your email address to reset your password.
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

        <button
          type="submit"
          className="my-4 w-full rounded bg-orange-600 py-2 text-base text-white"
        >
          {loading ? "Please wait..." : "Get Reset Link"}
        </button>

        <div className="mt-4 text-start">
          <span className="text-sm text-neutral-600">
            I want to{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}
