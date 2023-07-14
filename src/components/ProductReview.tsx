import { ChangeEvent, FormEvent, useState } from "react";
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from "../redux/features/books/bookapi";
import { useAppSelector } from "../redux/hook";

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  console.log(data);
  const { user } = useAppSelector((state) => state.user);
  const [postComment, { isLoading }] = usePostCommentMutation();
  console.log(isLoading);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: { comment: inputValue },
    };
    postComment(options);
    setInputValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {user?.email && (
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <textarea
            className="w-full focus:outline-none border border-black rounded p-3 h-12"
            placeholder="Write your comment Here"
            onChange={handleChange}
            value={inputValue}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-sky-600 rounded text-white"
          >
            Comment
          </button>
        </form>
      )}
      <div className="mt-10">
        <h3 className="text-2xl text-center mb-2">All comments</h3>
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <p className="text-lg">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
