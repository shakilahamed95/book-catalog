import { useSingleUserQuery } from "../redux/features/books/bookapi";
import { useAppSelector } from "../redux/hook";

export default function Wishlist() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useSingleUserQuery(user?.email);
  console.log(data);
  return (
    <div className="container mx-auto">
      <h3 className="text-2xl text-center">Hello {user?.email}</h3>
    </div>
  );
}
