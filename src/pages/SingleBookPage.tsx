import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookapi";
import BookReview from "../components/ProductReview";
import { useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function SingleBookPage() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data: book, isLoading } = useSingleBookQuery(id);
  const [deleteBook, { isError, isSuccess }] = useDeleBookMutation();
  const navigate = useNavigate();
  const handleDelete = () => {
    Swal.fire({
      icon: "error",
      title: "Delete",
      text: "Are You sure want to delete this book?",
    }).then((result) => {
      if (result.isConfirmed) {
        const options = {
          id: id,
          data: book,
        };
        deleteBook(options);
      }
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong....");
    }
    if (isSuccess) {
      toast.success(`You have successfully Delete ${book.title}`);
      navigate("/all-books");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <>
      {!book && isLoading && (
        <h6 className="h-80 w-full mt-36 text-xl text-center">
          Loading... Please wait
        </h6>
      )}
      {book && !isLoading && (
        <div className="container mx-auto">
          <div className="flex max-w-7xl mx-auto items-center mb-4">
            <div className="w-[50%]">
              <img src={book?.image} alt="" className="w-[600px] h-[600px]" />
            </div>
            <div className="w-[50%] space-y-3">
              <h1 className="text-3xl">
                <span className="font-bold">Title</span>:{book?.title}
              </h1>
              <p className="text-xl">
                <span className="font-bold">Author</span>: {book?.author}
              </p>
              <p className="text-xl">
                <span className="font-bold">Genre</span>: {book?.genre}
              </p>
              <p className="text-xl">
                <span className="font-bold">Publish</span>:{" "}
                {book?.publication_date}
              </p>
              {user.email && (
                <div className="flex gap-5 mt-4">
                  <button className="px-5 py-2 bg-sky-600 rounded text-white">
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-5 py-2 bg-sky-600 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          {user.email && (
            <div className="border-t border-black">
              <BookReview id={id!} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
