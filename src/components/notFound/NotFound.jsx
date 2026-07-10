import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="notFound">
      <div className="notFound__container">
        <h1 className="notFound__title">404</h1>

        <h2 className="notFound__subtitle">
          Página no encontrada
        </h2>

        <p className="notFound__text">
          La página que estás buscando no existe o fue movida.
        </p>

        <Link to="/" className="notFound__button">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
