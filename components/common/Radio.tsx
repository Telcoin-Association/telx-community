import React from "react";

export interface ArticleProps {
  active?: boolean;
  text: string;
  onClick: any;
  onClickPayload: any;
}

export default function Article(props: ArticleProps) {
  const {
    active,
    text,
    onClick,
    onClickPayload
  } = props;

  const handleOnClick = () => {
    onClick(onClickPayload)
  }

  return (
    <div className={`radio ${active ? 'active' : 'inactive'}`} onClick={handleOnClick}>
      <div className="radio-circle">
        <div className="radio-circle-inner"></div>
      </div>
      <p>{text}</p>
    </div>
  )
}
