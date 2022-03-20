import Link from "next/link";
import React from "react";
import Image from "next/image";

export interface CardPageButtonProps {
  linkUrl: string;
  name: string;
  handle: string;
  image: string;
}

export default function TwitterMember(props: CardPageButtonProps) {
  const { name, handle, image, linkUrl } = props;
  
  return (
    <div className="twitter-member">
      <Image src={image} height={80} width={80} alt={`${name} PFP`} className="twitter-member-pfp"/>
      <div className="twitter-member-info">
        <h4>{name}</h4>
        <Link href={linkUrl} passHref>
          {handle}
        </Link>
      </div>
    </div>
  )
}
