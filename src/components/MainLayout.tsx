import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className={`flex-grow ${location.pathname === "/" ? "" : "pt-24"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
