import React from "react";

export interface GuideMainProps {
  article?: any;
}

export default function GuideMain(props: GuideMainProps) {
  const { article } = props;
  const { createdAt, detail, id, locale, publishedAt, rawHtml, title, updatedAt  } = article;

  return (
    <main className="guide-main">
      <div className="guide-main-inner">
        <h1>{title}</h1>
        <h4>Updated {updatedAt}</h4>
        <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
      </div>
    </main>
  )
}
