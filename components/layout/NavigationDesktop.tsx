import React from "react";
import NavigationSharedInner from "./NavigationSharedInner";

interface NavigationDesktopProps {
  navigationItems: Array<any>;
  toggleMobileNavOpen: any;
}

export default function NavigationDesktop(props: NavigationDesktopProps) {
  const { navigationItems, toggleMobileNavOpen } = props;

  return (
    <div
      id="navigation-desktop"
    >
      <div className="navigation-desktop-inner">
        <NavigationSharedInner
          navigationItems={navigationItems}
          toggleMobileNavOpen={toggleMobileNavOpen}
        />   
      </div>
    </div>
  );
}
