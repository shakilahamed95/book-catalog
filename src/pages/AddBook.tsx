import { BookForm } from "../components/BookForm";

export default function AddBook() {
  return (
    <>
      <h3 className=" text-center text-3xl">Add A New Book</h3>
      <h3 className=" text-center text-xl mt-4">Enter Book Description</h3>
      <div className="mt-4">
        <BookForm />
      </div>
    </>
  );
}
