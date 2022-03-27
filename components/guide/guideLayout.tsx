import React from "react";
import GuideBar from "./guideBar";
import GuideNav from "./guideNav";
import GuideMain from "./guideMain";

export interface GuideLayoutProps {
  name?: string;
}

export default function GuideLayout(props: GuideLayoutProps) {
  
  return (
    <div className="guide-layout">
      <GuideBar />
      <div className="guide-layout-inner">
        <GuideNav />
        <GuideMain />
      </div>
    </div>
  )
}
