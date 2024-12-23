import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import img from "../../img";
const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);

  const CardArray=[
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
]
const followingArray=[
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
]
const newsArray=[
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
      {
        background: img.creatorbackground8,
        user: img.user7
      },
      {
        background: img.creatorbackground9,
        user: img.user10
      },
]

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
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <h2>Top List Creators</h2>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={() => openPopular()}>
              <BsFillAlarmFill /> 24 hours
            </button>
            <button onClick={() => openFollower()}>
              <BsCalendar3 /> 7 days
            </button>
            <button onClick={() => openNews()}>
              <BsFillCalendarDateFill /> 30 days
            </button>
          </div>
        </div>
      </div>
      {popular && (
        <div className={Style.collection_box}>
          {CardArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el}/>
          ))}
        </div>
      )}

      {following && (
        <div className={Style.collection_box}>
          {followingArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el}/>
          ))}
        </div>
      )}

      {news && (
        <div className={Style.collection_box}>
          {newsArray.map((el, i) => (
            <DaysComponent key={i + 1} i={i} el={el}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
