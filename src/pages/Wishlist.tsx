import { MyListForm } from "../components/Mylistform";
import { WishListForm } from "../components/WishListForm";
import { useAppSelector } from "../redux/hook";

export default function Wishlist() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="container mx-auto">
      <h3 className="text-2xl text-center">Hello {user?.email}</h3>
      <div className="mt-8 flex justify-center gap-40">
        <WishListForm />
        <MyListForm />
      </div>
    </div>
  );
}
