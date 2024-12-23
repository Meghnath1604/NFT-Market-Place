import React from 'react'
//INTERNAL IMPORT
import Style from '../styles/search.module.css'
import { Slider,Brand,Title } from '../components/componentsindex'
import { SearchBar } from '../SerachPage/SerachPageindex'
import { Filter } from '../components/componentsindex'
import { NFTCardTwo,Banner } from '../collectionPage/collectionIndex'
import images from '../img'
const search = () => {
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
      ];
  return (
    <div className={Style.searchPage}>
    <Banner bannerImage={images.creatorbackground2} />
    <SearchBar />
    <Filter />
    <NFTCardTwo NFTData={collectionArray} />
    <Title
        heading="Explore NFTs Video"
        paragraph="Click on play icon & enjoy Nfts Video."
      />
    <Slider />
    <Brand />
  </div>
  )
}

export default search
