import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookapi";
import { EditForm } from "../components/EditForm";

export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  return (
    <div>
      <h4 className="text-2xl text-center">Edit This Book.</h4>
      <EditForm book={book} />
    </div>
  );
}
