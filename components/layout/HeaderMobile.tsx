import React from "react";
import { Menu as MenuIcon } from "@transferwise/icons";
import Link from "next/link";

interface HeaderMobileProps {
  toggleMobileNavOpen: any;
  mobileNavOpen: boolean;
}

export default function HeaderMobile(props: HeaderMobileProps) {
  const { mobileNavOpen, toggleMobileNavOpen } = props;

  return (
    <div id="header-mobile">
      <Link href="/">
        <a>
          <h4>TELx Community</h4>
        </a>
      </Link>
      <div onClick={() => !toggleMobileNavOpen(!mobileNavOpen)}>
        <MenuIcon size={24} />
      </div>
    </div>
  );
}
