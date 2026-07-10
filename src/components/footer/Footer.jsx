import "./Footer.css";

import { company } from "../../config/company";
import { socialLink } from "../../config/socialLink";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-top mt-auto">

      <div className="container py-4">

        {/* Marca */}

        <div className="text-center mb-4">

          <h5 className="footer-title mb-1">
            {company.name}
          </h5>

          <p className="footer-slogan mb-0">
            {company.slogan}
          </p>

        </div>

        {/* Redes */}

        <nav
          aria-label="Redes sociales"
          className="mb-4"
        >
          <ul className="list-unstyled d-flex justify-content-center gap-3 mb-0">

            {socialLink.map(({ name, url, icon, variant }) => (

              <li key={name}>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-outline-${variant} rounded-pill px-3`}
                >

                  <i className={`${icon} me-2`}></i>

                  {name}

                </a>

              </li>

            ))}

          </ul>
        </nav>

        {/* Copyright */}

        <div className="footer-copy text-center">

          <p className="mb-1">

            © {currentYear} {company.name}. {company.copyright}

          </p>

          <small>

            {company.environment} • {company.course}

          </small>

        </div>

      </div>

    </footer>
  );
};
