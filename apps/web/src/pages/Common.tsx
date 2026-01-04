import { Link } from "wouter-preact";

export function Common() {
    return (
        <div className="container">
            <div class="p-5 justify-content-center h-100 text-center rounded bg-danger-subtle">
                <h1 class="text-body-emphasis fw-bolder p-5">Are you lost?</h1>
                <Link href="/" class="btn btn-primary ">Go Home</Link>
            </div>
        </div>
    )
}