import React from "react";

export interface GuideMainProps {
  title?: string;
  updated?: string;
  content?: string;
}

export default function GuideMain(props: GuideMainProps) {
  
  const { title, content, updated } = props;

  return (
    <main className="guide-main">
      <div className="guide-main-inner">
        <h1>{title}</h1>
        <h4>Updated {updated}</h4>
        <p>{content}</p>
      </div>
    </main>
  )
}
