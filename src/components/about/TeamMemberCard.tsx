import { Heading, Text } from "../common";
import styles from "../../styles/pages/TeamMemberCard.module.scss";
import { Icons } from "../../utils/Icons.tsx";
import { companyValues } from "../../config/aboutData.ts";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className={styles.teamMemberCard}>
      <img
        src={member.imageUrl}
        alt={member.name}
        className={styles.memberImage}
      />
      <div className={styles.memberInfo}>
        <Heading as="h3" size="textxl">
          {member.name}
        </Heading>
        <Text className={styles.memberRole}>{member.role}</Text>
        <Text className={styles.memberBio}>{member.bio}</Text>
        <div className={styles.socialLinks}>
          {member.socialLinks.twitter && (
            <a
              href={member.socialLinks.twitter}
              aria-label={`${member.name}'s Twitter`}
            >
              <Icons.XTwitter style={{ fontSize: "24px" }} />
            </a>
          )}
          {member.socialLinks.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Icons.Linkedin style={{ fontSize: "24px" }} />
            </a>
          )}
          {member.socialLinks.facebook && (
            <a
              href={member.socialLinks.facebook}
              aria-label={`${member.name}'s Facebook`}
            >
              <Icons.Facebook style={{ fontSize: "24px" }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
