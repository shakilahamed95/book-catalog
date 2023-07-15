import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface Iprops {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Iprops) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const [authenticationComplete, setAuthenticationComplete] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAuthenticationComplete(true);
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading ....</p>;
  }

  if (!authenticationComplete) {
    return <p>Authenticating ...</p>;
  }

  if (!user.email) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }

  return children;
}
