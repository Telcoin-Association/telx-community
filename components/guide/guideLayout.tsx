import React from "react";
import GuideBar from "./guideBar";
import GuideNav from "./guideNav";
import GuideMain from "./guideMain";
import GuidePrevNext from "./guidePrevNext";
import { ArticleProps } from "../common/Article";
export interface GuideLayoutProps {
  article: ArticleProps;
  articles: Array<ArticleProps>
}

export default function GuideLayout(props: GuideLayoutProps) {
  const { article, articles } = props;

  console.log('article', article)

  return (
    <div className="guide-layout">
      <GuideBar selectedArticle={article} />
      <div className="guide-layout-inner">
        <GuideNav 
          selectedArticle={article}
          articles={articles}
        />
        <GuideMain 
          article={article}
          articles={articles}
        />
      </div>
    </div>
  )
}
