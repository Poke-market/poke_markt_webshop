import { Heading, Text, Button } from "../components/common";
import styles from "../styles/pages/AboutPage.module.scss";
import { TeamMemberCard } from "../components/about/TeamMemberCard";
import { companyValues, teamMembers } from "../config/aboutData.ts";
import { Icons } from "../utils/Icons";

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Icons.Trophy style={{ fontSize: "50px", color: "#4a6bff" }} />
        <Heading as="h1" size="text3xl">
          Our Story
        </Heading>
        <Text size="textlg" className={styles.heroText}>
          We're the tech-obsessed students who turned a school project into
          something special. Founded in 2025, PokeMart began when a simple
          assignment revealed a big opportunity: e-commerce could be smarter,
          smoother, and more human. What started as classroom code is now a
          mission to reshape online shopping, we build intuitive experiences
          where technology does the heavy lifting, so you can focus on what
          matters, every feature is designed to feel effortless, because we
          believe great tech should work for you, not the other way around.
          Still powered by that same student curiosity (just with better snacks
          now), we're creating the future of digital commerce - one innovative
          solution at a time.
        </Text>
      </section>

      {/* Our Values Section */}
      <section className={styles.valuesSection}>
        <Heading as="h2" size="text3xl" className={styles.sectionTitle}>
          Our Values
        </Heading>
        <div className={styles.valuesGrid}>
          {companyValues.map((value) => (
            <div key={value.title} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                {value.icon === "quality" && (
                  <Icons.Warranty style={{ fontSize: "48px" }} />
                )}
                {value.icon === "innovation" && (
                  <Icons.Settings style={{ fontSize: "48px" }} />
                )}
                {value.icon === "sustainability" && (
                  <Icons.Delivery style={{ fontSize: "48px" }} />
                )}
                {value.icon === "Support" && (
                  <Icons.Help style={{ fontSize: "48px" }} />
                )}
              </div>
              <Heading as="h3" size="textxl">
                {value.title}
              </Heading>
              <Text>{value.description}</Text>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
