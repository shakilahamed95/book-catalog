import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookapi";

export default function SingleBookPage() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  console.log(book);
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center">
        <div className="w-[50%]">
          <img src={book?.image} alt="" className="w-[600px] h-[600px]" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl">
            <span className="font-bold">Title</span >:{book?.title}
          </h1>
          <p className="text-xl">
            <span className="font-bold">Author</span>: {book?.author}
          </p>
          <p className="text-xl">
            <span className="font-bold">Genre</span>: {book?.genre}
          </p>
          <p className="text-xl">
            <span className="font-bold">Publish</span>: {book?.publication_date}
          </p>
        </div>
      </div>
    </>
  );
}
