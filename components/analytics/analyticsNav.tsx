import React from "react";
import LinkItem from "../common/LinkItem";
import ArticleProps from "./analyticsLayout";
import { titleToSlug } from "../../type-helpers";

export interface AnalyticsNavProps {
  charts?: Array<any>;
  categories?: Array<any>;
}

export default function AnalyticsNav(props: AnalyticsNavProps) {
  const { charts } = props;

  const categories: any[] = [];
  
  if (charts) {
    charts.map((chart, i) => {
      const category = chart.category;
      if (category) {
        if (!categories.includes(category)) {
          chart.category && categories.push(chart.category);
        }
      }
    })
  }

  console.log('categories', categories);


  return (
    <aside className="analytics-nav">
      <h2>Analytics</h2>

      <ul>
        {
          categories && categories.map( (category, i) => {
            return (
              <li className="analytics-nav-category" key={i}>
                <LinkItem 
                  linkUrl={`/analytics/${titleToSlug(category)}`}
                  linkText={category}
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
