import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookapi";
import { IBooks } from "../types/globalTypes";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setDate, setGenre } from "../redux/features/books/bookSlice";
export default function Allbooks() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const { date, genre } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handlePublicationDateChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDate = event.target.value;
    dispatch(setDate(selectedDate));
  };
  const handleGenereChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = event.target.value;
    dispatch(setGenre(selectedGenre));
  };

  let booksData;

  if (date !== "0" && genre !== "default") {
    booksData = data?.data.filter(
      (item: { publication_date: string; genre: string }) =>
        item.publication_date === date && item.genre === genre
    );
  } else if (date !== "0") {
    booksData = data?.data.filter(
      (item: { publication_date: string; genre: string }) =>
        item.publication_date === date
    );
  } else if (genre !== "default") {
    booksData = data?.data.filter(
      (item: { publication_date: string; genre: string }) =>
        item.genre === genre
    );
  } else {
    booksData = data?.data;
  }
  return (
    <div className="container mx-auto">
      <h3 className="text-center text-3xl text-blue-800 font-semibold mb-8">
        All Available Books
      </h3>
      <div className="py-10 flex items-center gap-3">
        <div className="p-2 border border-black w-fit">
          <select
            onChange={handlePublicationDateChange}
            name="publicationDate"
            id="publicationDate"
            className="focus:outline-none w-40"
          >
            <option value={0}>Publication date</option>
            {data?.data?.map((book: IBooks) => (
              <option key={book._id} value={book.publication_date}>
                {book.publication_date}
              </option>
            ))}
          </select>
        </div>
        <div className="p-2 border border-black w-fit">
          <select
            onChange={handleGenereChange}
            name="genre"
            id="genre"
            className="focus:outline-none w-40"
          >
            <option value="default">Select genre</option>
            {data?.data?.map((book: IBooks) => (
              <option key={book._id} value={book.genre}>
                {book.genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container mx-auto">
        {!data?.data && isLoading && (
          <h6 className="h-80 w-full mt-36 text-xl text-center">
            Loading... Please wait
          </h6>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
          {!isLoading &&
            booksData &&
            booksData.map((book: IBooks) => <BookCard book={book} />)}
        </div>

        <div className="flex items-center justify-center mt-10">
          <Link
            to="/add-new-book"
            className="px-5 py-2 bg-sky-600 rounded text-white"
          >
            Add new book
          </Link>
        </div>
      </div>
    </div>
  );
}
