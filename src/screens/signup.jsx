import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please provide a valid name"),
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().required("Please provide a valid password"),
  })
  .required();

export default function Signup() {
  const { loading, signupUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signupUser(data.email, data.password, data.name);
    } catch (error) {
      toast.error(error.message);
    }
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
            Create an account
          </h2>
          <p className="text-sm text-neutral-600">
            Please fill all the required details below to signup
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="name">
            <span className="mb-1 block">Name</span>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              autoComplete="on"
              className="w-full rounded border border-neutral-600 p-2 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
            />
            <span className="mt-1 block text-sm text-red-600">
              {errors.name?.message}
            </span>
          </label>
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
            <span className="mb-1 block">Password</span>
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
          {loading ? "Please wait..." : "Signup"}
        </button>

        <div className="mt-4 text-start">
          <span className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}
