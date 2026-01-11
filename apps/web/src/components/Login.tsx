import githubMark from "../assets/github-mark-white.svg";
import { loginWithGitHub } from "../store";

export function Login() {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <div class="mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="57"
          viewBox="0 -960 960 960"
          class="bi"
          width="72"
          fill="currentColor"
          aria-label="Simple Notes App">
          <path d="M280-170v-373q0-58 39.5-97.5T416-680h374q57 0 96.5 39.5T926-544v296L712-34H416q-57 0-96.5-39.5T280-170ZM36-702q-10-56 22-102t88-56l368-64q56-10 102 22t56 88l9 54H416q-90 0-153 63t-63 154v316q-37-9-65-37.5T100-334L36-702Zm764 396H654v146l146-146Z" /></svg>
        <h1 class="display-5 fw-bold text-body-emphasis">Simple Notes App</h1>
        <p class="lead mb-4">
          Please login using your GitHub account to manage your important notes
          easily.
        </p>
        <button class="btn btn-dark border px-5 mb-5" onClick={loginWithGitHub} type="button">
          <img
            src={githubMark}
            alt="GitHub Invertocat logo"
            class="github-mark me-2"
            width="20"
            height="20"
          />{" "}
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
