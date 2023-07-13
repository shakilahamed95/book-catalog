/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { loginUser } from "../redux/features/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: LoginFormInputs) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };
  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user.email, navigate]);

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
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Login with email
          </button>
        </div>
      </form>
    </div>
  );
}
