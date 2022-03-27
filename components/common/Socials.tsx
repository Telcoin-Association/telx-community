import React from "react";
import IconTelegram from "../../public/icons/telegram.svg";
import IconTwitter from "../../public/icons/twitter.svg";
import IconYoutube from "../../public/icons/youtube.svg";
import IconDiscord from "../../public/icons/discord.svg";

interface SocialsProps {
  socialItems: Array<any>;
}

const Socials = (props: SocialsProps) => {
  const { socialItems } = props;
  return (
    <div className="socials">
      <ul>
        {socialItems.map((item) => {
          const { link, icon } = item;
          const lowercaseName = icon?.toLowerCase();

          let Icon;

          switch (lowercaseName) {
            case "telegram":
              Icon = IconTelegram;
              break;
            case "twitter":
              Icon = IconTwitter;
              break;
            case "discord":
              Icon = IconDiscord;
              break;
            case "youtube":
              Icon = IconYoutube;
              break;
          }

          console.log('link', link)
          console.log('lowecaseName', lowercaseName)

          if (Icon !== undefined) {
            return (
              <li key={lowercaseName}>
                <a href={link} target="_blank" rel="noreferrer">
                  <Icon />
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Socials;
