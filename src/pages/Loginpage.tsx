import { BannerShop, Button, Heading, Input, UspBanner } from "../utils";
import styles from "./scss/pages/Loginpage.module.scss";
const Loginpage = () => {
  return (
    <>
      <BannerShop title="Login" />
      <div className={styles.loginContainer}>
        <div>
          <Heading as="h2" size="textlg">
            Email address
          </Heading>
          <Input type="email" placeholder="Abc@def.com" />
        </div>
        <div>
          <Heading as="h2" size="textlg">
            Password
          </Heading>
          <Input type="password" placeholder="Password" />
        </div>
        <Button>Login</Button>
      </div>
      <UspBanner />
    </>
  );
};
export default Loginpage;
