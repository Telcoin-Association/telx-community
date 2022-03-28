import React from "react";
export interface ArticleProps {
  createdAt?: string;
  detail?: string;
  id?: number;
  locale?: string;
  publishedAt?: string;
  rawHtml?: string;
  title?: string;
  updatedAt?: string;
}

export default function Article(props: ArticleProps) {
  const { createdAt, detail, id, locale, publishedAt, rawHtml, title, updatedAt  } = props;

  return (
    <div className="article">
      <h1>{title}</h1>
      <h4>Updated {updatedAt}</h4>
      {
        rawHtml && <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
      }
    </div>
  )
}
