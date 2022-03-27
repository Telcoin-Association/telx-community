import React from "react";
import LinkItem from "../common/LinkItem";

export interface GuideNavProps {
  name?: string;
}

const guideItems = [
  {
    name: 'What is Decentralized Finance?',
    link: '/education/what-is-decentralized-finance'
  },
  {
    name: 'Guide to DeFi',
    link: '/education/guide-to-defi'
  },
  {
    name: 'What are AMM’s?',
    link: '/education/what-are-amms'
  },
  {
    name: 'Getting Started',
    link: '/education/getting-started'
  },
  {
    name: 'Sending Telcoin to Polygon',
    link: '/education/sending-telcoin-to-polygon'
  },
  {
    name: 'Discord Walkthrough',
    link: '/education/discord-walkthrough'
  },
]

export default function GuideNav(props: GuideNavProps) {
  
  return (
    <aside className="guide-nav">
      <h2>Education</h2>

      <ul>
        {
          guideItems.map( (item, i) => {
            const { name, link } = item;
            return (
              <li key={i}>
                <LinkItem 
                  linkUrl={link}
                  linkText={name}
                  external={false}
                />
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}
