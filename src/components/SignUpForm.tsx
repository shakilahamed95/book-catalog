/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { createUser } from "../redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSaveUserMutation } from "../redux/api/list/listApi";
interface LoginFormInputs {
  email: string;
  password: string;
  cPassword: string;
}

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [passError, setPassError] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [saveUser] = useSaveUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    if (data.password !== data.cPassword) {
      setPassError(true);
    } else {
      setPassError(false);
      dispatch(createUser({ email: data.email, password: data.password }));
      saveUser({ email: data.email, password: data.password });
    }
  };
  useEffect(() => {
    if (user.email) {
      toast.success("User Account created successfully");
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
          <div>
            <p className="text-base text-black mb-1">Confirm Password</p>
            <input
              id="cPassword"
              placeholder="your password"
              type="password"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("cPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.cPassword && (
              <p className="text-red-600">{errors.cPassword.message}</p>
            )}
            {passError && (
              <p className="text-red-600">Confirm Password does not match</p>
            )}
          </div>
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
