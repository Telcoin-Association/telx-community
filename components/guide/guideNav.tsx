import React from "react";
import LinkItem from "../common/LinkItem";
import ArticleProps from "./guideLayout";
import { titleToSlug } from "../../type-helpers";

export interface GuideNavProps {
  articles?: Array<any>
}



export default function GuideNav(props: GuideNavProps) {
  const { articles } = props;

  const categories: string[] = [];
  if (articles) {
    articles.map((article, i) => {
      const category = article.category;
      if (category) {
        if (!categories.includes(category)) {
          article.category && categories.push(article.category);
        }
      }
    })
  }

  return (
    <aside className="guide-nav">
      <h2>Education</h2>

      <ul>
        {
          // map through categories
          categories.map((category, i) => {
            // gather category articles in an array
            let categoryArticles: any[] = [];
            if (articles) {
              articles.map((article, i) => {
                if (category === article.category) {
                  const { title  } = article;
                  const slugTitle = titleToSlug(title);
                  categoryArticles.push({
                    title: title,
                    slugTitle: slugTitle
                  })
                }
              })
            }
            // return top level category
            return (
              <li key={`${category}-${i}`}>
                <h3>{category}</h3>
                {/* return category's articles */}
                <ul>
                {
                  categoryArticles.map((article, i) => {
                    const { title, slugTitle } = article;
                    return (
                      <li key={`${article.title}-${i}`}>
                        <LinkItem 
                          linkUrl={`/education/${slugTitle}`}
                          linkText={title}
                          external={false}
                        />
                      </li>
                    )
                  }
                  )}
                </ul>
              </li>
            )
          })
        }
      </ul>
    </aside>
  )
}
