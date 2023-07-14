/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { IBooks } from "../types/globalTypes";
import { useAddBookMutation } from "../redux/features/books/bookapi";
import { toast } from "react-toastify";
export function BookForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBooks>();

  const [addBook, { isLoading, isSuccess, isError }] = useAddBookMutation();
  console.log("isLoading", isLoading);
  console.log("isSuccess", isSuccess);
  console.log("isError", isError);
  const onSubmit = (data: IBooks) => {
    const bookData = {
      image: data.image,
      title: data.title,
      author: data.author,
      genre: data.genre,
      publication_date: data.publication_date,
    };
    addBook(bookData);
    if (isError) {
      const notify = toast.error("something went wrong....");
    }
    if (!isError && !isLoading && isSuccess) {
      const notify = toast.success("You Have successfully added a new book");
      reset();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-8 bg-gray-100 w-fit shadow-md rounded"
      >
        <div className="flex flex-col gap-3 items-center justify-center">
          <div>
            <p className="text-base text-black mb-1">Enter image url</p>
            <input
              id="image"
              placeholder="image Url here"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-600">{errors.image.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter book title</p>
            <input
              id="title"
              placeholder="Book Title here"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter Book Author</p>
            <input
              id="author"
              placeholder="Author name here"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className="text-red-600">{errors.author.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter genre name</p>
            <input
              id="genre"
              placeholder="Genre name here"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && (
              <p className="text-red-600">{errors.genre.message}</p>
            )}
          </div>
          <div>
            <p className="text-base text-black mb-1">Add Publication Date</p>
            <input
              id="publication_date"
              placeholder="name@example.com"
              type="text"
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("publication_date", {
                required: "Publication date is required",
              })}
            />
            {errors.publication_date && (
              <p className="text-red-600">{errors.publication_date.message}</p>
            )}
          </div>
          <button className="mt-4 px-5 py-2 bg-sky-600 rounded text-white">
            Enter Your Book
          </button>
        </div>
      </form>
    </div>
  );
}
