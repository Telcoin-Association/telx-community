import React from "react";
import AnalyticsNav from "./analyticsNav";
import AnalyticsMain from "./analyticsMain";
import { ArticleProps } from "../common/Article";

export interface AnalyticsLayoutProps {
  charts:Array<any>;
}

export default function AnalyticsLayout(props: AnalyticsLayoutProps) {
  const {  charts } = props;
  
  return (
    <div className="analytics-layout">
      {/* <GuideBar /> */}
      <div className="analytics-layout-inner">
        <AnalyticsNav 
          charts={charts}
        />
        <AnalyticsMain 
          charts={charts}
        />
      </div>
    </div>
  )
}
