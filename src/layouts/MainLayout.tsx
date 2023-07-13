import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <div className="py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
