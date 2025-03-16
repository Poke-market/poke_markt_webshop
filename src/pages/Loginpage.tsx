import { BannerShop, Button, Input, UspBanner } from "../utils";
import styles from "../scss/pages/LoginPage.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: add functionality
    console.log("Login attempt with:", { email, password });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <BannerShop title="Login" />
      <form onSubmit={handleSubmit} className={styles.loginContainer}>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Abc@def.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button>Login</Button>
      </form>
      <UspBanner />
    </>
  );
};

export default Loginpage;
