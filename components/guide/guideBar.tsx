import React from "react";
import { More as MoreIcon } from "@transferwise/icons";
import { ArticleProps } from "../common/Article";

export interface GuideBarProps {
  selectedArticle?: ArticleProps;
  guideNavOpen?: boolean;
  toggleGuideNavOpen?: any;
  pageTitle?: string;
}

export default function GuideBar(props: GuideBarProps) {
  
  const { 
    selectedArticle,
    guideNavOpen,
    toggleGuideNavOpen,
    pageTitle
  } = props;

  const handleOnClick = () => {
    toggleGuideNavOpen(!guideNavOpen);
  }

  return (
    <div className="guide-bar" onClick={handleOnClick}>
      <div className="guide-bar-items">
        <h4>Education</h4>
        <p>Resources for DeFi and TELx</p>
        {/* {selectedArticle && selectedArticle.category && <h6>{selectedArticle.category}</h6>}
        <h4>{selectedArticle && selectedArticle.title}</h4> */}
      </div>
      <MoreIcon size={24} />
    </div>
  )
}
