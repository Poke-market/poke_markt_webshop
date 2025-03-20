import { Footer, Header } from "../../utils";
import Logout from "../../components/auth/Logout";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Logout />
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
