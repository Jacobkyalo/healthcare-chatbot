import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";

const schema = yup
  .object()
  .shape({
    password: yup.string().min(8).required("Please provide a valid password"),
    passwordAgain: yup
      .string()
      .min(8)
      .required("Please provide a valid password"),
  })
  .required();

export default function ResetPassword() {
  const { loading, updatePasswordRecovery } = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await updatePasswordRecovery(
      userId,
      secret,
      data.password,
      data.passwordAgain
    );
  };

  return (
    <main className="grid place-items-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl mx-auto bg- p-4 rounded-xl shadow-2xl"
      >
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold text-black">
            Reset Your Password
          </h2>
          <p className="text-sm text-neutral-600">
            Enter your new password here.
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="password">
            <span className="mb-1 block">New Password</span>
            <input
              {...register("password")}
              type="password"
              placeholder="New Password"
              name="password"
              id="password"
              autoComplete="off"
              className="w-full rounded border border-neutral-600 p-2 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
            />
            <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
              {errors.password?.message}
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="passwordAgain">
            <span className="mb-1 block">Confirm New Password</span>
            <input
              {...register("passwordAgain")}
              type="password"
              placeholder="Confirm New Password"
              name="passwordAgain"
              id="passwordAgain"
              autoComplete="off"
              className="w-full rounded border border-neutral-600 p-2 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
            />
            <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
              {errors.passwordAgain?.message}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="my-4 w-full rounded bg-orange-600 py-3 text-base text-white"
        >
          {loading ? "Please wait..." : "Reset Password"}
        </button>
      </form>
    </main>
  );
}
