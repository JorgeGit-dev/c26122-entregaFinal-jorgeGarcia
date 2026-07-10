import { Outlet } from "react-router-dom";

import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Nav } from "../components/nav/Nav";

export const PublicLayout = () => {
  return (
    <>
      <Header />

      <Nav />

      <main className="container py-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};