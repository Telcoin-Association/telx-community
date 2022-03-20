import React from "react";
import Link from "next/link";

export interface FooterProps {
}

export default function HeaderMobile(props: FooterProps) {

  return (
    <footer>
      <div className="page-layout-centered">
        <div className="page-layout-centered-inner">
          <h4>TELx Community</h4>
        </div>
      </div>
    </footer>
  );
}
