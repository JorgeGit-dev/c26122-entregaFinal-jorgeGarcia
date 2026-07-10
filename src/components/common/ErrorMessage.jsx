import PropTypes from "prop-types";

export const ErrorMessage = ({
  message,
  className = "",
}) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`alert alert-danger ${className}`}
      role="alert"
    >
      {message}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};
