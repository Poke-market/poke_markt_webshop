import { Header, Footer } from "../utils/index.ts";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
