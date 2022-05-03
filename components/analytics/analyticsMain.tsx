import React from "react";
import { ArticleProps } from "../common/Article";
import Article from "../common/Article";

export interface AnalyticsMainProps {
  charts?: Array<any>;
}

export default function AnalyticsMain(props: AnalyticsMainProps) {

  const { charts } = props;

  return (
    <main className="analytics-main">
      <div className="analytics-main-inner">
        Chart
      </div>
    </main>
  )
}
