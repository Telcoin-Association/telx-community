import React from "react";
import NavigationSharedInner from "./NavigationSharedInner";
import { Cross as CrossIcon } from "@transferwise/icons";

interface NavigationMobileProps {
  navigationItems: Array<any>;
  mobileNavOpen: boolean;
  toggleMobileNavOpen: any;
}

export default function NavigationMobile(props: NavigationMobileProps) {
  const { navigationItems, mobileNavOpen, toggleMobileNavOpen } = props;

  return (
    <div
      id="navigation-mobile" className={mobileNavOpen ? 'open' : 'closed' }
    >
      <div className="close-menu" onClick={() => !toggleMobileNavOpen(!mobileNavOpen)}>
        <CrossIcon size={24} />
      </div>
      <NavigationSharedInner
        navigationItems={navigationItems}
        toggleMobileNavOpen={toggleMobileNavOpen}
      />   
    </div>
  );
}
