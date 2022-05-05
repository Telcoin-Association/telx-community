import React from "react";
export interface ArticleProps {
  createdAt?: string;
  detail?: string;
  id?: string;
  order?: number;
  locale?: string;
  publishedAt?: string;
  rawHtml?: string;
  title?: string;
  updatedAt?: string;
  category?: string;
  youtube?: string;
}

export default function Article(props: ArticleProps) {
  const { createdAt, detail, id, locale, publishedAt, rawHtml, title, updatedAt, youtube  } = props;

  return (
    <div className="article">
      <h1>{title}</h1>
      {/* <h4>Updated {updatedAt}</h4> */}

      {
        youtube && (
          <div className="iframe-container">
            <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${youtube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        )
      }
      
      {
        rawHtml && <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
      }
    </div>
  )
}
