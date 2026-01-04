import { useEffect } from "preact/hooks";
import { supabase } from "../lib/supabase";
import { Login } from "./components/Login";
import { AddNote } from "./components/AddNote";
import { addNote, fetchNotes, getDisplayName, login, logout, notes, session } from "./store";
import { Home } from "./pages/Home";
import { Route, Switch } from "wouter-preact";
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
      <div id="app">
        <Login onLogin={login} />
      </div>
    );
  }

  return (
    <div id="app">
      <header class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-body sticky-top">
          <div class="container-fluid">
            <a class="navbar-brand d-inline-flex" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="currentColor"
                class="bi bi-text-fill"
                viewBox="0 0 16 16"
                role="img"
                aria-label="Simple Notes App"
              >
                <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
              </svg>
            </a>
            <form class="justify-content-center">
              <AddNote onAddNote={addNote} />
              {/* <input class="form-control" type="search" placeholder="Search" aria-label="Search" hidden /> */}
            </form>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav justify-content-center me-auto">
                <li class="nav-item"></li>
              </ul>
              <span class="navbar-text me-3">Hello, {getDisplayName()}</span>
              <button
                onClick={logout}
                class="btn btn-danger btn-sm"
                aria-label="Logout"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
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
        </nav>
      </header>
      <main class="">
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
    </div>
  );
}
