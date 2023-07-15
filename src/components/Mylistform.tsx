/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {} from "../redux/features/books/bookapi";
import {
  usePostMyListMutation,
  useSingleUserQuery,
  useUpdateMyListMutation,
} from "../redux/api/list/listApi";

interface LoginFormInputs {
  _id: string;
  title: string;
  status: string;
}

export function MyListForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [updateList, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateMyListMutation();
  const { user } = useAppSelector((state) => state.user);
  const [postMyList, { isSuccess, isError }] = usePostMyListMutation();
  const { data } = useSingleUserQuery(user?.email);
  console.log(data);
  const onSubmit = (data: LoginFormInputs) => {
    const myListData = {
      email: user?.email,
      bookTitle: data.title,
      status: data.status,
    };
    postMyList(myListData);
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

  const handleListUpdate = (id: string) => {
    const Options = {
      email: user?.email,
      id: id,
    };
    updateList(Options);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Book status updated to finished reading");
    }
    if (updateError) {
      toast.error("Something Went wrong");
    }
  }, [updateSuccess, updateError]);

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
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter Current Status</p>
            <input
              id="status"
              placeholder="Status here"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("status", { required: "Status is required" })}
            />
            {errors.status && (
              <p className="text-red-600">{errors.status.message}</p>
            )}
          </div>
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Add to my list
          </button>
        </div>
      </form>

      {data?.data?.myList && (
        <div className="mt-8">
          <h5 className="text-2xl">Your Book List:</h5>
          <p className="text-base mt-1">
            By clicking Change Status button you can change book status into{" "}
            <br />
            completed. If no button its mean the book reading is completed.
          </p>
          <div className="mt-2 flex items-center gap-5 justify-start">
            <p className="text-lg w-36">Title</p>
            <p className="text-lg">Status</p>
          </div>
          {data?.data?.myList?.map((book: LoginFormInputs, index: number) => (
            <div
              key={index}
              className="mt-2 flex items-center gap-8 justify-start"
            >
              <p className="text-lg w-32">{book.title}</p>
              <p className="text-lg w-44">{book.status}</p>
              {book.status !== "finished reading" && (
                <button
                  onClick={() => handleListUpdate(book._id)}
                  className="px-2 py-1 bg-sky-600 rounded text-white"
                >
                  Change Status
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
