import "./Toast.css";

export const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  return (
    <div 
      className={`toast toast--${type}`}
      role="alert"
    >
      {message}
    </div>
  );
};
