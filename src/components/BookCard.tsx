import { Link } from "react-router-dom";

export default function BookCard() {
  return (
    <div className="bg-slate-100 rounded w-fit">
      <Link to="/">
        <img
          src="https://source.unsplash.com/random/300x300/?2"
          alt="book image"
          className="object-cover object-center w-[324px] rounded-t-md h-72"
        />
      </Link>
      <div className="p-3 text-black">
        <h6 className="text-lg font-semibold">
          <Link to="/">How to make web templates</Link>
        </h6>
        <p className="mt-2 text-base">Author:Black</p>
        <p className="mt-2 text-base">
          Publication Date:Black
        </p>
      </div>
    </div>
  );
}
