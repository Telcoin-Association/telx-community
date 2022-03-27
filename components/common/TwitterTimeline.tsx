import React from "react";
import { Timeline } from "react-twitter-widgets";

export default function TwitterTimeline() {
  return (
    <Timeline
      dataSource={{
        sourceType: "profile",
        screenName: "telxcommunity",
      }}
      options={{
        height: 860,
      }}
      renderError={() => (
        <p>
          Error loading Twitter feed. Visit{" "}
          <a href="https://twitter.com/telxcommunity">@telxcommunity</a> on
          Twitter.com
        </p>
      )}
    />
  );
}
