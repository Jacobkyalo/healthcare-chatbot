import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <section className="flex h-screen flex-col items-center justify-center">
        <h3 className="mb-4 text-base font-medium text-neutral-600">
          404 | Page not found
        </h3>
        <Link
          to="/"
          className="bg-orange-600 rounded px-4 py-2 text-base text-white"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}
