/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  usePostWishlistMutation,
  useSingleUserQuery,
} from "../redux/features/books/bookapi";

interface LoginFormInputs {
  title: string;
}

export function WishListForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { user } = useAppSelector((state) => state.user);
  const [postWishlist, { isSuccess, isError }] = usePostWishlistMutation();
  const { data } = useSingleUserQuery(user?.email);
  const onSubmit = (data: LoginFormInputs) => {
    const wishListData = {
      email: user?.email,
      bookTitle: data.title,
    };
    postWishlist(wishListData);
    if (isSuccess) {
      toast.success("Book Title added to wishlist");
      reset();
    }
    if (isError) {
      toast.error("Something Went wrong");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Title added to wishlist");
      reset();
    }
    if (isError) {
      toast.error("Something Went wrong");
    }
  }, [isError, isSuccess, reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-gray-100 w-fit shadow-md rounded"
      >
        <div className="flex flex-col gap-3 items-center justify-center">
          <div>
            <p className="text-base text-black mb-1">Enter Book Title</p>
            <input
              id="title"
              placeholder="Title here"
              type="text"
              autoComplete="email"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Add to wishlist
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h5 className="text-2xl">Your WishListed Book:</h5>
        {data?.data?.wishlist?.map((book: string, index: number) => (
          <div key={index} className="mt-2">
            <p className="text-lg">{book}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
