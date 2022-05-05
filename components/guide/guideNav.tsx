import React from "react";
import LinkItem from "../common/LinkItem";
import { titleToSlug } from "../../type-helpers";
import { ArticleProps } from "../common/Article";

export interface GuideNavProps {
  articles?: Array<any>
  selectedArticle?: ArticleProps;
}



export default function GuideNav(props: GuideNavProps) {
  const { articles, selectedArticle } = props;

  const selectedArticleTitle = selectedArticle && selectedArticle.title;

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
              <li className="guide-nav-category" key={`${category}-${i}`}>
                <h3>{category}</h3>
                {/* return category's articles */}
                <ul>
                {
                  categoryArticles.map((article, i) => {
                    const { title, slugTitle } = article;
                    const selectedArticle = title === selectedArticleTitle ? true : false;
                    return (
                      <li key={`${article.title}-${i}`}>
                        <LinkItem 
                          linkUrl={`/education/${slugTitle}`}
                          linkText={title}
                          external={false}
                          className={selectedArticle ? 'active' : 'inactive'}
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
