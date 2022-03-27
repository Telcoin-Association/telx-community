import React from "react";
import { More as MoreIcon } from "@transferwise/icons";

export interface GuideBarProps {
  name?: string;
}

export default function GuideBar(props: GuideBarProps) {
  
  return (
    <div className="guide-bar">
      <h4>What are AMM’s?</h4>
      <MoreIcon size={24} />
    </div>
  )
}
