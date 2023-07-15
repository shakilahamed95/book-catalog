import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface Iprops {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Iprops) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  if (isLoading) {
    return <p>Loading ....</p>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }
  return children;
}
