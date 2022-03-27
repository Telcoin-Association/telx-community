import React from "react";
import LinkItem from "../common/LinkItem";
import Socials from "../common/Socials";

export interface FooterProps {
  navigationItems: Array<any>;
  socialItems: Array<any>;
}

export default function HeaderMobile(props: FooterProps) {
  const { navigationItems, socialItems } = props;

  return (
    <footer>
      <div className="page-layout-centered">
        <div className="page-layout-centered-inner">
          <div className="footer-cols">
            <div className="footer-column-nav">
              <h4>TELx Community</h4>
              <ul>
                {
                  navigationItems.map( (item, i) => {
                    const { link, name, external, newWindow } = item;
                    return (
                      <li key={i}>
                        <LinkItem 
                          linkUrl={link}
                          linkText={name}
                          external={external}
                          newWindow={newWindow}
                        />
                      </li>
                    )
                  })
                }
              </ul>
              <Socials socialItems={socialItems} />
            </div>
            <div className="footer-column-disclaimer">
              <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
