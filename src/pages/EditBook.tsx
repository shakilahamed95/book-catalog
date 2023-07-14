import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/bookapi";
import { EditForm } from "../components/EditForm";

export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  return (
    <div>
      <h4 className="text-2xl text-center mb-6">Update This Book.</h4>
      <div className="mb-6">
        <EditForm book={book} />
      </div>
    </div>
  );
}
