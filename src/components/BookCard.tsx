import { Link } from "react-router-dom";
import { IBooks } from "../types/globalTypes";

interface IProps {
    book: IBooks;
  }

export default function BookCard({book}:IProps) {
  return (
    <div className="bg-slate-100 rounded w-fit">
      <Link to={`/book-details/${book._id}`}>
        <img
          src={book.image}
          alt="book image"
          className="object-cover object-center w-[324px] rounded-t-md h-72"
        />
      </Link>
      <div className="p-3 text-black">
        <h6 className="text-lg font-semibold">
          <Link to={`/book-details/${book._id}`}>{book.title}</Link>
        </h6>
        <p className="mt-2 text-base">Author: {book.author}</p>
        <p className="mt-2 text-base">
          Publish: {book.publication_date}
        </p>
      </div>
    </div>
  );
}
