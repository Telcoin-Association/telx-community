import React, { ReactElement, useState } from "react";
import GuideBar from "./guideBar";
import GuideNav from "./guideNav";
import GuideMain from "./guideMain";
import { ArticleProps } from "../common/Article";
export interface GuideLayoutProps {
  article: ArticleProps;
  articles: Array<ArticleProps>
}

export default function GuideLayout(props: GuideLayoutProps) {
  const { article, articles } = props;

  const [ guideNavOpen, toggleGuideNavOpen ] = useState(false);

  return (
    <div className="guide-layout">
      <GuideBar 
        selectedArticle={article} 
        guideNavOpen={guideNavOpen}
        toggleGuideNavOpen={toggleGuideNavOpen}
      />
      <div className="guide-layout-inner">
        <GuideNav 
          selectedArticle={article}
          articles={articles}
          guideNavOpen={guideNavOpen}
          toggleGuideNavOpen={toggleGuideNavOpen}
        />
        <GuideMain 
          article={article}
          articles={articles}
        />
      </div>
    </div>
  )
}
