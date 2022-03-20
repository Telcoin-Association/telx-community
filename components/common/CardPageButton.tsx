import Link from "next/link";
import React from "react";
import { Menu as MenuIcon } from "@transferwise/icons";
import { Graph as GraphIcon } from "@transferwise/icons";
import { InfoCircle as InfoCircleIcon } from "@transferwise/icons";
import { OfficeExpenses as OfficeExpensesIcon } from "@transferwise/icons";
import { Camera as CameraIcon } from "@transferwise/icons";


export interface CardPageButtonProps {
  linkUrl: string;
  title: string;
  icon: string;
  description: string;
  newWindow?: boolean;
  onClick?: any;
}

export default function CardPageButton(props: CardPageButtonProps) {
  const { title, description, icon, linkUrl, newWindow, onClick } = props;

  let Icon;
  switch (icon) {
    case "graph":
        Icon = <GraphIcon size={24}/>;
      break;
    case "info-circle":
        Icon = <InfoCircleIcon size={24}/>;
      break;
    case "office-expenses":
        Icon = <OfficeExpensesIcon size={24}/>;
      break;
    case "camera":
        Icon = <CameraIcon size={24}/>;
      break;
  }
  
  return (
    <Link href={linkUrl} passHref>
      <div className="card-page-button">
        <div className="card-page-icon-title">
          {Icon}
          <h4>{title}</h4>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  )
}
