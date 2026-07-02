import AboutBrand from "@/app/_components/about/AboutBrand";
import AboutHero from "../_components/about/AboutHero";
import AboutOffer from "../_components/about/AboutOffer";

export const metadata = {
  title: "About — Visitoonz Art Enterprise",
  description: "The story behind the brand",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <AboutHero />
      <AboutBrand />
      <AboutOffer />
    </main>
  );
}
