/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { useForm } from "react-hook-form";
import { IBooks } from "../types/globalTypes";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUpdateBookMutation } from "../redux/features/books/bookapi";

interface IProps {
  book: IBooks;
}

export function EditForm({ book }: IProps) {
  const { register, handleSubmit } = useForm<IBooks>();
  const [updateBook, { isLoading, isError, isSuccess }] =
    useUpdateBookMutation();
  console.log(isLoading);

  const onSubmit = (data: IBooks) => {
    const bookData = {
      image: data?.image ? data.image : book.image,
      title: data?.title ? data.title : book.title,
      author: data.author ? data.author : book.author,
      genre: data.genre ? data.genre : book.genre,
      publication_date: data.publication_date
        ? data.publication_date
        : book.publication_date,
    };
    const options = {
      id: book?._id,
      data: bookData,
    };
    updateBook(options);
  };
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong....");
    }
    if (isSuccess) {
      toast.success("Book Info updated successfully");
    }
  }, [isError, isSuccess]);

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
              defaultValue={book?.image}
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("image")}
            />
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter book title</p>
            <input
              id="title"
              placeholder="Book Title here"
              type="text"
              defaultValue={book?.title}
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("title")}
            />
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter Book Author</p>
            <input
              id="author"
              placeholder="Author name here"
              type="text"
              defaultValue={book?.author}
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("author")}
            />
          </div>
          <div>
            <p className="text-base text-black mb-1">Enter genre name</p>
            <input
              id="genre"
              placeholder="Genre name here"
              type="text"
              defaultValue={book?.genre}
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("genre")}
            />
          </div>
          <div>
            <p className="text-base text-black mb-1">Add Publication Date</p>
            <input
              id="publication_date"
              placeholder="Publication date here"
              type="text"
              defaultValue={book?.publication_date}
              className="w-72 px-3 py-2 border border-black focus:outline-none"
              {...register("publication_date")}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-sky-600 rounded text-white"
          >
            Update Book Info
          </button>
        </div>
      </form>
    </div>
  );
}
