import React from "react";
import { More as MoreIcon } from "@transferwise/icons";
import { ArticleProps } from "../common/Article";
import LinkItem from "../common/LinkItem";
import { titleToSlug } from "../../type-helpers";

export interface GuidePrevNextProps {
  article?: ArticleProps;
  articles?: Array<ArticleProps>
}

export default function GuidePrevNext(props: GuidePrevNextProps) {

  const { article, articles } = props;
  const order = article && article.order;

  const prevOrder = order && order - 1;
  const nextOrder = order && order + 1;
  let prevArticle:ArticleProps = {};
  let nextArticle:ArticleProps = {};

  articles && articles.map((article, i) => {
    const thisArticleOrder = article.order;
    if (prevOrder === thisArticleOrder) {
      prevArticle = article;
    }
    if (nextOrder === thisArticleOrder) {
      nextArticle = article;
    }
  });
  
  return (
    <div className="prev-next guide-prev-next">
      <div className="prev-container">
        { prevArticle && (
          <LinkItem 
            linkUrl={`/education/${titleToSlug(prevArticle.title)}`}
            linkText={prevArticle.title}
            external={false}
            newWindow={false}
            icon="chevron-left"
          />
        )}
      </div>
      <div className="next-container">
        { nextArticle && (
          <LinkItem 
            linkUrl={`/education/${titleToSlug(nextArticle.title)}`}
            linkText={nextArticle.title}
            external={false}
            newWindow={false}
            icon="chevron-right"
          />
        )}
      </div>
    </div>
  )
}
