import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-36 grid h-auto w-50 justify-center mx-auto">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="block font-bold italic font-heading px-6 py-2 text-sm md:text-lg bg-border w-auto"
      >
        Cynthia Ofori, Go Home!
      </Link>
    </main>
  );
}

export default NotFound;
