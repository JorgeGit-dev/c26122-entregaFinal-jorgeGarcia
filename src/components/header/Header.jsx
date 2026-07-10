import { Link } from "react-router-dom";
import logo from "../../assets/logo_image.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="shadow-sm sticky-top">
      <div className="container py-2">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-3 text-decoration-none text-dark"
        >
          <img
            src={logo}
            alt="Logo Distribuidora Reactiva"
            className="logo"
          />

          <span className="brand-title d-none d-sm-inline">
            Distribuidora Reactiva
          </span>
        </Link>
      </div>
    </header>
  );
};
