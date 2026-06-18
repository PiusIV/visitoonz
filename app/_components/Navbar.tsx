import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import TopNav from "./TopNav";

export default function Page() {
  return (
    <div className="flex justify-between px-6 m-5 h-auto top-0 static bg-transparent">
      <Logo />
      <TopNav />
      <ThemeToggle />
    </div>
  );
}
