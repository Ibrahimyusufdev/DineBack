import { Link, Outlet } from "react-router-dom";
import { Footer } from "./src/components/Footer";

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
