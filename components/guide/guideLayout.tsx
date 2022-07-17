import React, { ReactElement, useState } from "react";
import GuideBar from "./guideBar";
import GuideNav from "./guideNav";
import GuideMain from "./guideMain";
import { ArticleProps } from "../common/Article";
export interface GuideLayoutProps {
  article: ArticleProps;
  articles: Array<ArticleProps>;
  pageTitle?: string;
}

export default function GuideLayout(props: GuideLayoutProps) {
  const { article, articles, pageTitle } = props;

  const [ guideNavOpen, toggleGuideNavOpen ] = useState(false);

  return (
    <div className="guide-layout">
      <GuideBar 
        selectedArticle={article} 
        pageTitle={pageTitle}
        guideNavOpen={guideNavOpen}
        toggleGuideNavOpen={toggleGuideNavOpen}
      />
      <div className="guide-layout-inner">
        <GuideNav 
          selectedArticle={article}
          articles={articles}
          guideNavOpen={guideNavOpen}
          toggleGuideNavOpen={toggleGuideNavOpen}
          pageTitle={pageTitle}
        />
        <GuideMain 
          article={article}
          articles={articles}
        />
      </div>
    </div>
  )
}
