import React, { ReactElement, useState } from "react";
import HeaderMobile from "./HeaderMobile";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";
import Footer, { FooterProps } from "./Footer";

export const navigationItems = [
  {
    link: "/analytics",
    name: "Analytics",
    external: false,
    newWindow: false
  },
  {
    link: "/tools",
    name: "Tools",
    external: false,
    newWindow: false
  },
  {
    link: "/guides",
    name: "Guides",
    external: false,
    newWindow: false
  },
  {
    link: "/media",
    name: "Media",
    external: false,
    newWindow: false
  },
];

interface LayoutProps {
  // footer: ContentfulFooterProps[];
  // socials: ContentfulSocialsProps[];
  children: ReactElement;
}

export default function Layout(props: LayoutProps) {
  const [mobileNavOpen, toggleMobileNavOpen] = useState(false);
  const { 
    // footer, 
    // socials, 
    children 
  } = props;

  return (
    <div>
      <div
        id="layout"
        className={`${mobileNavOpen ? "show-mobile-nav" : "hide-mobile-nav"}`}
      >
        <HeaderMobile 
          mobileNavOpen={mobileNavOpen}
          toggleMobileNavOpen={toggleMobileNavOpen}
        />
        <NavigationMobile 
          navigationItems={navigationItems} 
          mobileNavOpen={mobileNavOpen}
          toggleMobileNavOpen={toggleMobileNavOpen}
        />
        <NavigationDesktop 
          navigationItems={navigationItems} 
          toggleMobileNavOpen={toggleMobileNavOpen}
        />
        <div id="page-content">
          {children}
          {/* {footer && <Footer socials={socials} footer={footer} />} */}
        </div>
        <Footer />
      </div>
    </div>
  );
}
