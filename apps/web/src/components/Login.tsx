import githubMark from "../assets/github-mark-white.svg";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <div class="mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="57"
          fill="currentColor"
          class="bi bi-file-text-fill d-block mx-auto mb-4"
          viewBox="0 0 16 16"
        >
          <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
        </svg>
        <h1 class="display-5 fw-bold text-body-emphasis">Simple Notes App</h1>
        <p class="lead mb-4">
          Please login using your GitHub account to manage your important notes
          easily.
        </p>
        <button class="btn btn-dark px-5 mb-5" onClick={onLogin} type="button">
          <img
            src={githubMark}
            alt="GitHub Invertocat logo"
            class="github-mark"
            width="25"
            height="25"
          />{" "}
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
