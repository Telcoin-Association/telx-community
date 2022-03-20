import Link from "next/link";
import React from "react";

export interface LinkItemProps {
  linkUrl: string;
  linkText: string;
  external: boolean;
  newWindow?: boolean;
  onClick?: any;
}

export default function LinkItem(props: LinkItemProps) {
  const { external, linkText, linkUrl, newWindow, onClick } = props;

  const internalButton = (
    <span>
      <Link href={linkUrl}>
        <a onClick={onClick}>{linkText}</a>
      </Link>
    </span>
  );

  const externalButton = newWindow ? (
    <a href={linkUrl} target="_blank" rel="noreferrer" onClick={onClick}>
      {linkText}
    </a>
  ) : (
    <a href={linkUrl} onClick={onClick}>
      {linkText}
    </a>
  );

  return external ? externalButton : internalButton;
}
