import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/books/bookapi";
import { IBooks } from "../types/globalTypes";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setDate,
  setGenre,
  setSearchTerm,
} from "../redux/features/books/bookSlice";

export default function Allbooks() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [searchValue, setSearchValue] = useState<string>("");
  const { date, genre, searchTerm } = useAppSelector((state) => state.book);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setSearchTerm(searchValue));
    setSearchValue("");
  };

  let booksData: IBooks[] | undefined;

  if (searchTerm !== "empty") {
    booksData = data?.data.filter(
      (item: IBooks) =>
        item.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        item.genre
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        item.author.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  } else {
    booksData = data?.data;
  }

  if (date !== "0" && genre !== "default") {
    booksData = booksData?.filter(
      (item: IBooks) => item.publication_date === date && item.genre === genre
    );
  } else if (date !== "0") {
    booksData = booksData?.filter(
      (item: IBooks) => item.publication_date === date
    );
  } else if (genre !== "default") {
    booksData = booksData?.filter((item: IBooks) => item.genre === genre);
  }
  return (
    <div className="container mx-auto">
      <h3 className="text-center text-3xl text-blue-800 font-semibold mb-8">
        All Available Books
      </h3>
      <div className="flex items-center justify-between">
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
        <form onSubmit={handleSearch}>
          <input
            onChange={handleChange}
            placeholder="Search by title, author, or genre"
            type="text"
            value={searchValue}
            className="w-72 px-3 py-2 border border-black focus:outline-none rounded"
          />
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-sky-600 text-white ml-2"
          >
            Search
          </button>
        </form>
      </div>
      <div className="container mx-auto">
        {!data?.data && isLoading && (
          <h6 className="h-80 w-full mt-36 text-xl text-center">
            Loading... Please wait
          </h6>
        )}
        {booksData?.length == 0 && (
          <h6 className="h-80 w-full mt-36 text-xl text-center">
            Sorry No book available based on your request
          </h6>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10">
          {!isLoading &&
            booksData &&
            booksData.map((book: IBooks) => (
              <BookCard key={book._id} book={book} />
            ))}
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
