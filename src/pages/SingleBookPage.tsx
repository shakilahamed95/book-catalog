import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookapi";
import BookReview from "../components/ProductReview";
import { useAppSelector } from "../redux/hook";

export default function SingleBookPage() {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  console.log("user", user);
  const { data: book, isLoading } = useSingleBookQuery(id);
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
