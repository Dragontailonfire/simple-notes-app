import { useEffect } from "preact/hooks";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import { AddNote } from "./components/AddNote";
import { addNote, fetchNotes, getDisplayName, login, logout, notes, session } from "./store";
import { Home } from "./pages/Home";
import { Route, Switch, Link } from "wouter-preact";
import { NoteDetail } from "./pages/NoteDetail";
import { Common } from "./pages/Common";

export function App() {

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      session.value = s;
      if (s) fetchNotes();
      else notes.value = [];
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!session.value) {
    return (
      <Login onLogin={login} />
    );
  }

  return (
    <>
      <header class="sticky-top container border-bottom bg-body my-2">
        <div class="row row-cols-auto justify-content-evenly align-items-center my-2">
          <div class="col">
            <Link class="align-items-center link-body-emphasis text-decoration-none" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 -960 960 960"
                class="bi"
                width="30"
                fill="currentColor"
                aria-label="Simple Notes App">
                <path d="M280-170v-373q0-58 39.5-97.5T416-680h374q57 0 96.5 39.5T926-544v296L712-34H416q-57 0-96.5-39.5T280-170ZM36-702q-10-56 22-102t88-56l368-64q56-10 102 22t56 88l9 54H416q-90 0-153 63t-63 154v316q-37-9-65-37.5T100-334L36-702Zm764 396H654v146l146-146Z" />
              </svg> {`${getDisplayName()}'s Notes`}
            </Link>
          </div>
          <div class="col-8 col-md">
            <AddNote onAddNote={addNote} />
          </div>
          <div class="col">
            <button
              onClick={logout}
              class="btn btn-danger"
              aria-label="Logout"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                fill="currentColor"
                class="bi bi-power"
                viewBox="0 0 16 16"
              >
                <path d="M7.5 1v7h1V1z" />
                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
              </svg>
            </button>
          </div>


        </div>
      </header>
      <main class="container my-2">
        <div class="pdt-4"></div>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/note/:id" component={NoteDetail} />
          <Route component={Common} />
        </Switch>
      </main>
      {/* <footer class="fixed-bottom bg-body-tertiary h-10 mt-5">
        <span class="text-body-secondary p-1">
          © 2026 Dragontailonfire
        </span>
      </footer> */}
    </>
  );
}
