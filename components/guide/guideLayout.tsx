import React from "react";
import GuideBar from "./guideBar";
import GuideNav from "./guideNav";
import GuideMain from "./guideMain";

export interface GuideLayoutProps {
  title?: string;
  updated?: string;
  content?: string;
}

export default function GuideLayout(props: GuideLayoutProps) {
  const { title, content, updated } = props;
  
  return (
    <div className="guide-layout">
      <GuideBar />
      <div className="guide-layout-inner">
        <GuideNav />
        <GuideMain 
          title={title}
          updated={updated}
          content={content}
        />
      </div>
    </div>
  )
}
