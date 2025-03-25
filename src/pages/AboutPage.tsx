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
          We are tech enthusiasts who transformed a school project into
          something extraordinary Founded in 2025, PokeMart emerged from a
          simple assignment that unveiled a significant opportunity: e-commerce
          could be smarter, smoother, and more human. What began as classroom
          code has evolved into a mission to revolutionize online shopping. We
          create intuitive experiences where technology handles the heavy
          lifting, allowing you to focus on what truly matters. Every feature is
          designed to be effortless because we believe great tech should work
          for you, not the other way around. Still driven by the same student
          curiosity (now with better snacks), we are shaping the future of
          digital commerce with innovative solutions. We are here to assist
          everyone, except our competitors.
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

      {/* Team Section */}
      <section className={styles.teamSection}>
        <Heading as="h2" size="text3xl" className={styles.sectionTitle}>
          Meet the Team
        </Heading>
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <Icons.CustomerService style={{ fontSize: "48px", color: "#4a6bff" }} />
        <Heading as="h2" size="text3xl">
          Want to join our journey?
        </Heading>
        <Button>
          Contact Us <Icons.ArrowRight style={{ marginLeft: "8px" }} />
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;
