import Hero from "@/app/_components/Hero";
import { Suspense } from "react";
import FeaturedSection from "./_components/FeaturedSection";
import Spinner from "./_components/Spinner";
import AboutStrip from "./_components/AbooutStrip";
import ContactStrip from "./_components/ContactStrip";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<Spinner />}>
        <FeaturedSection />
      </Suspense>
      <AboutStrip />
      <ContactStrip />
    </div>
  );
}
