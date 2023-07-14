import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookapi";
import { IBooks } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  return (
    <div>
      <h3 className="text-center text-3xl text-blue-800 font-semibold mb-8">
        Most Popular Books
      </h3>
      <div className="container mx-auto">
        {!data?.data && isLoading && (
          <h6 className="h-80 w-full mt-36 text-xl text-center">
            Loading... Please wait
          </h6>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
          {!isLoading &&
            data?.data &&
            data?.data
              ?.slice(0, 10)
              .map((book: IBooks) => <BookCard book={book} />)}
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link
            to="/all-books"
            className="px-5 py-2 bg-sky-600 rounded text-white"
          >
            View all Books
          </Link>
        </div>
      </div>
    </div>
  );
}
