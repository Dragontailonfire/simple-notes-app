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
              class="bi bi-card-text d-block mx-auto mb-4"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
            </svg>
                <h1 class="display-5 fw-bold text-body-emphasis">Login to Simple Notes App</h1>
                <p class="lead mb-4">
                    Please login using your GitHub account to manage your important
                    notes easily.
                </p>
                <button
                    class="btn btn-dark px-5 mb-5"
                    onClick={onLogin}
                    type="button"
                >
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
        </div>)
}