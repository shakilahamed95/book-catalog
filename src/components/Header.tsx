import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import { setUser } from "../redux/features/user/userSlice";
import { auth } from "../lib/firebase";
export default function Header() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

  return (
    <nav className="w-full h-16 z-10 bg-violet-500">
      <div className="h-full w-full container mx-auto">
        <div className="flex items-center justify-between w-full h-full mx-auto ">
          <div>
            <img className="h-12" src={logo} alt="log" />
          </div>
          <div>
            <ul className="flex items-center gap-5">
              <li className="text-white">
                <Link to="/">Home</Link>
              </li>
              <li className="text-white">
                <Link to="/all-books">All Books</Link>
              </li>
              {!user.email && (
                <div className="flex items-center gap-5">
                  <li className="text-white">
                    <Link to="/sign-in">SignIn</Link>
                  </li>
                  <li className="text-white">
                    <Link to="/sign-up">SignUp</Link>
                  </li>
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-5">
                  <li
                    onClick={handleLogout}
                    className="text-white p-2 cursor-pointer"
                  >
                    LogOut
                  </li>
                  <li className="text-white">
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
