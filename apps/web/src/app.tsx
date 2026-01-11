import { useEffect } from "preact/hooks";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import { fetchNotes, getDisplayName, login, logout, notes, session } from "./store";
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
      <header class="container-fluid">
        <div class="row row-cols-auto justify-content-between align-items-center bg-body-tertiary p-2 shadow-sm">
          <div class="col">
            <Link class="align-items-center link-body-emphasis text-decoration-none" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"></path>
                <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"></path>
              </svg> {`${getDisplayName()}'s Notes`}
            </Link>
          </div>
          <div class="col">
            <button
              onClick={logout}
              class="btn btn-danger btn-sm"
              aria-label="Logout"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                <path d="M7.5 1v7h1V1z"></path>
                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main class="container my-2">
        <div class="pdt-4">
        </div>
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
