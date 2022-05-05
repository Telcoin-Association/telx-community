import Link from "next/link";
import React from "react";
import { ChevronLeft } from "@transferwise/icons";
import { ChevronRight } from "@transferwise/icons";

export interface LinkItemProps {
  linkUrl: string;
  linkText: string;
  external: boolean;
  newWindow?: boolean;
  onClick?: any;
  icon?: string;
  className?: string;
}

export default function LinkItem(props: LinkItemProps) {
  const { external, linkText, linkUrl, newWindow, onClick, icon, className } = props;

  const internalButton = (
    <span>
      <Link href={linkUrl}>
        <a onClick={onClick} className={className}>
          { icon === 'chevron-left' && <ChevronLeft />}
          {linkText}
          { icon === 'chevron-right' && <ChevronRight />}
        </a>
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
