import { Heading } from './Header.tsx';
import PokeLogo from '../assets/poke.png';
import styles from '../assets/scss/Footer.module.scss';

interface Props {
  className?: string;
}

// Footer component: used Props interface to define the type of props and passed it as a parameter to the Footer function
export default function Footer({ className = '', ...props }: Props) {
  return (
    <footer {...props} className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.logoSection}>
              <img
                src={PokeLogo}
                alt="Headerlogo"
                className={styles.footerLogo}
              />

              <Heading as="p" className={styles.address}>
                Oude Baan 2, 2800 Mechelen
                <br />
                Belgium
              </Heading>
            </div>

            <div className={styles.linksSection}>
              <Heading className={styles.footerHeading}>Links</Heading>
              <ul className={styles.linksList}>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Home</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Shop</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>About</Heading>
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank" rel="noreferrer">
                    <Heading>Contact</Heading>
                  </a>
                </li>
              </ul>
            </div>
            <Heading className={styles.copyright}>
              2025 Poke Market. All rights reserved
            </Heading>
          </div>
        </div>
      </div>
    </footer>
  );
}
