import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

const Discover = (props) => {
  const [userId, setUserId] = useState("");

  // 4 user personalized displays
  const [trending, setTrending] = useState([]);
  const [latest, setLatest] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recents, setRecents] = useState([]);

  // mount discover page
  useEffect(() => {
    setUserId(props.userId);

    get("api/trending", { tag: "trending" }).then((trendingObjs) => {
      setTrending(trendingObjs);
    });

    get("api/latest", { tag: "new" }).then((latestObjs) => {
      setLatest(latestObjs);
    });

    get("api/recommended", { id: userId, tag: "recommended" }).then((recommendedObjs) => {
      setRecommended(recommendedObjs);
    });

    get("api/recents", { id: userId, tag: "recent" }).then((recentObjs) => {
      setRecents(recentObjs);
    });

    // discover page dismount/cleanup callback
    return () => {
      setTrending([]);
      setLatest([]);
      setRecommended([]);
      setRecents([]);
    };
  }, []);

  return <div>No content yet!</div>;
};

export default Discover;
