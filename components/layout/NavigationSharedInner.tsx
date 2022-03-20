import Link from "next/link";
import React from "react";
import LinkItem from "../common/LinkItem";

interface NavigationSharedInnerProps {
  navigationItems: Array<any>;
  toggleMobileNavOpen?: any;
}

export default function NavigationSharedInner(props: NavigationSharedInnerProps) {
  const { navigationItems, toggleMobileNavOpen } = props;

  return (
    <nav
      id="navigation-shared-inner"
    >
      <div className="navigation-shared-inner-skrim">

        <div className="nsi-logo-wrapper">
          <Link href="/">
            <a onClick={() => toggleMobileNavOpen(false)}>
              <h1>TELx Community</h1>
              <h4>Made with 💙 by #telfam members</h4>
            </a>
          </Link>
        </div>

        <div className="nsi-menu-items">
          <ul>
            {
              navigationItems.map( (item, i) => {
                const { link, name, external, newWindow } = item;
                return (
                  <li key={i}>
                    <LinkItem 
                      linkUrl={link}
                      linkText={name}
                      external={external}
                      newWindow={newWindow}
                      onClick={() => !toggleMobileNavOpen(false)}
                    />
                  </li>
                )
              })
            }
          </ul>
          <div className="nsi-socials">
            <a href="https://twitter.com/joshworley_io">
              <div className="social twitter"></div>
            </a>
            <a href="https://www.linkedin.com/in/joshua-worley">
              <div className="social linkedin"></div>
            </a>
          </div>
          </div>
      </div>
    </nav>
  );
}


