import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
export default function Header() {
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
              <li className="text-white">
                <Link to="/sign-in">SignIn</Link>
              </li>
              <li className="text-white">
                <Link to="/sign-up">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
