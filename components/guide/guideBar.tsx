import React from "react";
import { More as MoreIcon } from "@transferwise/icons";
import { ArticleProps } from "../common/Article";

export interface GuideBarProps {
  selectedArticle?: ArticleProps;
  guideNavOpen?: boolean;
  toggleGuideNavOpen?: any;
}

export default function GuideBar(props: GuideBarProps) {
  
  const { 
    selectedArticle,
    guideNavOpen,
    toggleGuideNavOpen,
  } = props;

  const handleOnClick = () => {
    console.log('click logged')
    toggleGuideNavOpen(!guideNavOpen);
  }

  return (
    <div className="guide-bar" onClick={handleOnClick}>
      <div className="guide-bar-items">
        {selectedArticle && selectedArticle.category && <h6>{selectedArticle.category}</h6>}
        <h4>{selectedArticle && selectedArticle.title}</h4>
      </div>
      <MoreIcon size={24} />
    </div>
  )
}
