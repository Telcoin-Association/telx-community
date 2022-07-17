import React from "react";
import { ArticleProps } from "../common/Article";
import Article from "../common/Article";
import GuidePrevNext from "./guidePrevNext";

export interface GuideMainProps {
  article?: ArticleProps;
  articles: Array<ArticleProps>
}

export default function GuideMain(props: GuideMainProps) {

  const { article, articles } = props;
  
  // TODO: Make this better?
  // When accessing dynamic pages directly, there is a 1 second lag in rendering the content
  // If we don't allow page to render first on these pages, it breaks the site. So empty strings are provided.
  const createdAt = article ? article.createdAt : '';
  const detail = article ? article.detail : '';
  const id = article ? article.id : '';
  const locale = article ? article.locale : '';
  const publishedAt = article ? article.publishedAt : '';
  const rawHtml = article ? article.rawHtml : '';
  const title = article ? article.title : '';
  const updatedAt = article ? article.updatedAt : '';
  const youtube = article ? article.youtube : '';


  return (
    <main className="guide-main">
      <div className="guide-main-inner">
        <Article 
          createdAt={createdAt}
          detail={detail}
          id={id}
          locale={locale}
          publishedAt={publishedAt}
          rawHtml={rawHtml}
          title={title}
          updatedAt={updatedAt}
          youtube={youtube}
        />
        <GuidePrevNext
          article={article}
          articles={articles}
        />
      </div>
    </main>
  )
}
