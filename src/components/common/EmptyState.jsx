import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./EmptyState.css";

export const EmptyState = ({
  icon = "📦",
  title = "Sin resultados",
  description = "",
  buttonText,
  buttonTo = "/",
}) => {
  return (
    <section
      className="card empty-state-card shadow-sm text-center p-5 mx-auto"
    >

      <div
        className="display-4 mb-3"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h2 className="h4 fw-semibold mb-2">
        {title}
      </h2>

      {description && (
        <p className="mb-4">
          {description}
        </p>
      )}

      {buttonText && (
        <Link
          to={buttonTo}
          className="btn btn-primary"
        >
          {buttonText}
        </Link>
      )}

    </section>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonTo: PropTypes.string,
};