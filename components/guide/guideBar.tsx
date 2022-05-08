import React from "react";
import { More as MoreIcon } from "@transferwise/icons";
import { ArticleProps } from "../common/Article";

export interface GuideBarProps {
  name?: string;
  selectedArticle?: ArticleProps;
}

export default function GuideBar(props: GuideBarProps) {
  
  const { selectedArticle } = props;

  return (
    <div className="guide-bar">
      <div className="guide-bar-items">
        {selectedArticle && selectedArticle.category && <h6>{selectedArticle.category}</h6>}
        <h4>{selectedArticle && selectedArticle.title}</h4>
      </div>
      <MoreIcon size={24} />
    </div>
  )
}
