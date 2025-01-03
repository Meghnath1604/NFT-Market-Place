import React from 'react'
import { BsSearch,BsArrowRight } from 'react-icons/bs'
//INTERNAL IMPORT
import Style from './SerachBar.module.css'
const SerachBar = () => {
  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input type="text" placeholder="Type yout keyword..." />
        <BsArrowRight className={Style.SearchBar_box_icon} />
      </div>
    </div>
  )
}

export default SerachBar
