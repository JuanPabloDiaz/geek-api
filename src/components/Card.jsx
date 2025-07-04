import "./Card.css";

export default function Card(props) {
  const { href, title, body, category, tag, auth, https, cors } = props;

  return (
    <li className="link-card">
      <a href={href} target="_blank">
        <span className="category-badge">{category}</span>
        <div className="card-header">
          <strong className="card-title nu-u-mt-1 nu-u-mb-1">{title}</strong>
        </div>
        <p className="card-description nu-c-fs-small nu-u-mt-2 nu-u-mb-2">
          {body}
        </p>
        <p className="distribution">
          <div className="api-features">
            <span
              className="feature-item"
              title={`Authentication: ${auth || "No Auth"}`}
            >
              {auth && auth !== "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" stroke-width="1.5">
                    <path
                      stroke-linejoin="round"
                      d="M15.68 14.587c3.49 0 6.32-2.818 6.32-6.294S19.17 2 15.68 2S9.363 4.818 9.363 8.293c0 1.61.734 2.781.734 2.781l-7.642 7.61c-.343.342-.823 1.23 0 2.05l.882.878c.343.293 1.205.703 1.91 0l1.03-1.024c1.028 1.024 2.204.439 2.645-.147c.734-1.024-.147-2.049-.147-2.049l.294-.293c1.41 1.406 2.645.586 3.086 0c.735-1.024 0-2.049 0-2.049c-.294-.585-.882-.585-.147-1.317l.882-.878c.705.585 2.155.732 2.792.732Z"
                    />
                    <path
                      d="M17.885 8.294a2.2 2.2 0 0 1-2.204 2.195a2.2 2.2 0 0 1-2.205-2.195a2.2 2.2 0 0 1 2.205-2.196a2.2 2.2 0 0 1 2.204 2.196Z"
                      opacity="0.5"
                    />
                  </g>
                </svg>
              ) : (
                "✓"
              )}{" "}
              API Key
            </span>
            <span className="feature-item" title={`CORS: ${cors}`}>
              {cors === "yes" ? "✓" : "✗"} CORS
            </span>
            <span
              className="feature-item"
              title={`HTTPS: ${https ? "Yes" : "No"}`}
            >
              {https ? "✓" : "✗"} HTTPS
            </span>
          </div>
        </p>
      </a>
    </li>
  );
}
