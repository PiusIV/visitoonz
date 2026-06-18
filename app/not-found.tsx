import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-12 grid justify-center align-middle">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block font-bold italic font-heading px-6 py-3 text-sm md:text-lg rounded-4xl bg-gold w-auto"
      >
        Cynthia Ofori, Go Home!
      </Link>
    </main>
  );
}

export default NotFound;
