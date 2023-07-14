import { onAuthStateChanged } from "firebase/auth";
import MainLayout from "./layouts/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { auth } from "./lib/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <MainLayout />
    </>
  );
}

export default App;
