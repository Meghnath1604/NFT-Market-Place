import React, { useState, useEffect } from "react";
import {
  RiUserFollowFill,
  RiUserUnfollowFill,
  RiAwardLine,
} from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import img from './../../img'
const FollowerTab = () => {
  const CardArray = [
    {
      background: img.creatorbackground11,
      user: img.user1
    },
    {
      background: img.creatorbackground3,
      user: img.user2
    },
    {
      background: img.creatorbackground4,
      user: img.user3
    },
    {
      background: img.creatorbackground5,
      user: img.user4
    },
    {
      background: img.creatorbackground6,
      user: img.user5
    },
    {
      background: img.creatorbackground7,
      user: img.user6
    },
    {
      background: img.creatorbackground8,
      user: img.user7
    },
    {
      background: img.creatorbackground9,
      user: img.user10
    },
  ];
  const FollowingArray = [
    {
      background: img.creatorbackground6,
      user: img.user5
    },
    {
      background: img.creatorbackground7,
      user: img.user6
    },
    {
      background: img.creatorbackground3,
      user: img.user2
    },
    {
      background: img.creatorbackground10,
      user: img.user10
    },
    {
      background: img.creatorbackground5,
      user: img.user1
    },
    {
      background: img.creatorbackground1,
      user: img.user9
    },

  ];
  const NewsArray = [
    {
      background: img.creatorbackground10,
      user: img.user10
    },
    {
      background: img.creatorbackground4,
      user: img.user7
    },
    {
      background: img.creatorbackground5,
      user: img.user5
    },
    {
      background: img.creatorbackground3,
      user: img.user9
    },
    {
      background: img.creatorbackground1,
      user: img.user3
    },

  ];
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };
  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };
  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2> Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={() => openPopular()}>
              <RiUserFollowFill /> Popular
            </button>
            <button onClick={() => openFollower()}>
              <RiUserFollowFill /> Following
            </button>
            <button onClick={() => openNews()}>
              <RiAwardLine /> NoteWorthy
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {CardArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {FollowingArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {news && (
        <div className={Style.followerTab_box}>
          {NewsArray.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="#">Show me more</a>
          <a href="#">Become, author</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
