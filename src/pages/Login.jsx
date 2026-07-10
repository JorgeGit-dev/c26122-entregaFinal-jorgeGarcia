import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/auth";

export const Login = () => {
  const { login, loading, isAuthenticated } = useAuth();

  const location = useLocation();

  const from =
    location.state?.from?.pathname || "/admin/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const result = await login(
      form.email,
      form.password
    );

    if (!result.success) {
      setError(
        "Correo o contraseña incorrectos."
      );
    }
  };

  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-12 col-md-6 col-lg-4">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Administración
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <button
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Ingresando..."
                    : "Iniciar sesión"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};