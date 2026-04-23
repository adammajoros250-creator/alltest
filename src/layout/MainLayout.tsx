import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main
        className="flex-1 w-full"
        style={{ paddingTop: isHome ? 0 : "var(--navbar-h)" }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
