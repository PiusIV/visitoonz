import Hero from "@/app/_components/Hero";
import { Suspense } from "react";
import FeaturedSection from "@/app/_components/FeaturedSection";
import Spinner from "./_ui/Spinner";
import InquiryStrip from "./_components/InquiryStrip";
import ContactStrip from "./_components/ContactStrip";
import { getFeaturedProducts } from "./_lib/data-service";

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div>
      <Hero />
      <Suspense fallback={<Spinner />}>
        <FeaturedSection products={products} />
      </Suspense>
      <InquiryStrip />
      <ContactStrip />
    </div>
  );
}
