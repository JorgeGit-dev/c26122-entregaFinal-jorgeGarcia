import PropTypes from "prop-types";

export const Loader = ({
  message = "Cargando...",
  minHeight = "50vh",
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
      >
        <span className="visually-hidden">
          {message}
        </span>
      </div>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string,
  minHeight: PropTypes.string,
};
