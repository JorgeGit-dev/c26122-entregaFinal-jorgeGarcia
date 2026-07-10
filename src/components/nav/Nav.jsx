import { NavLink } from "react-router-dom";
import { useCart } from "../../context/cart";

import "./Nav.css";

const menuItems = [
  {
    label: "Inicio",
    path: "/",
    end: true,
  },
  {
    label: "Congelados",
    path: "/categoria/Congelados",
  },
  {
    label: "Cerdo",
    path: "/categoria/Cerdo",
  },
  {
    label: "Fríos",
    path: "/categoria/Frios",
  },
];

export const Nav = () => {
  const { totalItems } = useCart();

  return (
    <nav
      className="navbar navbar-expand-lg border-top border-bottom bg-light"
      aria-label="Navegación principal"
    >
      <div className="container">
        <ul className="navbar-nav flex-row flex-wrap align-items-center gap-2 gap-lg-4">
          {menuItems.map(({ label, path, end }) => (
            <li className="nav-item" key={path}>
              <NavLink
                to={path}
                end={end}
                className={({ isActive }) =>
                  `nav-link nav-custom ${isActive ? "active" : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/cart"
          className="btn btn-outline-dark position-relative ms-auto"
        >
          <i className="bi bi-cart3"></i>

          <span className="ms-2 d-none d-md-inline">
            Carrito
          </span>

          {totalItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
