import { Link, Outlet } from "react-router-dom";
import { Footer } from "./src/components/Footer";
import { HomePage } from "./src/Landing/HomePage";

export const Layout = () => {
  return (
    <>
    

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
