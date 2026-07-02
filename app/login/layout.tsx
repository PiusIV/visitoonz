type ChildrenProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: ChildrenProps) {
  return <main className="w-full h-screen">{children}</main>;
}
