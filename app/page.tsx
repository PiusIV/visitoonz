import Hero from "@/app/_components/Hero";
import { Suspense } from "react";
import FeaturedSection from "@/app/_components/FeaturedSection";
import Spinner from "./_ui/Spinner";
import InquiryStrip from "./_components/InquiryStrip";
import ContactStrip from "./_components/ContactStrip";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<Spinner />}>
        <FeaturedSection />
      </Suspense>
      <InquiryStrip />
      <ContactStrip />
    </div>
  );
}
