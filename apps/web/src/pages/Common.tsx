import { Link } from "wouter";

export function Common() {
    return (
        <div className="container mt-5 pt-5">
            <div class="position-relative p-5 text-center text-muted bg-body border rounded-5">
                <h1 class="text-body-emphasis">Are you lost?</h1>
                <Link type="button" href="/" class="btn btn-primary">Go Home</Link>
            </div>
        </div>
    )
}