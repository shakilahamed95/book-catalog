import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookapi";
import { IBooks } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  console.log(data?.data);
  console.log(isLoading);
  return (
    <div>
      <h3 className="text-center text-3xl text-blue-800 font-semibold mb-8">
        Most Popular Books
      </h3>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
          {data?.data?.slice(0, 10).map((book: IBooks) => (
            <BookCard book={book}/>
          ))}
        </div>
      </div>
    </div>
  );
}
