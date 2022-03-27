import React from "react";

export interface GuideMainProps {
  name?: string;
}

export default function GuideMain(props: GuideMainProps) {
  
  return (
    <main className="guide-main">
      <div className="guide-main-inner">
        <h1>What are AMM’s?</h1>
        <h4>Updated March 27, 2022</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
          <br/><br/>
          Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
          <br/><br/>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
          <br/><br/>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
          <br/><br/>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </p>
      </div>
    </main>
  )
}
