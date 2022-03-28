import React from "react";
import LinkItem from "../common/LinkItem";
import ArticleProps from "./guideLayout";

export interface GuideNavProps {
  articles: Array<any>
}


export default function GuideNav(props: GuideNavProps) {
  const { articles } = props;

  return (
    <aside className="guide-nav">
      <h2>Education</h2>

      <ul>
        {
          articles.map( (article, i) => {
            const { id, title  } = article;

            return (
              <li key={i}>
                <LinkItem 
                  linkUrl={`/{id}`}
                  linkText={title}
                  external={false}
                />
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}
