/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { createUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hook";

interface LoginFormInputs {
  email: string;
  password: string;
}

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-8 bg-gray-100 w-fit shadow-md rounded"
      >
        <div className="flex flex-col gap-3 items-center justify-center">
          <div>
            <p className="text-base text-black mb-1">Enter your Email</p>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter your Password</p>
            <input
              id="password"
              placeholder="your password"
              type="password"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Confirm Password</p>
            <input
              id="password"
              placeholder="your password"
              type="password"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
            />
          </div>
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
