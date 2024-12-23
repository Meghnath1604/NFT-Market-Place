import React from 'react'
//INTERNAL IMPORT
import { Button, Category, Brand,Title } from '../components/componentsindex'
import NFTDetailsPage from '../NFTDetailsPage/NFTDetailsPage'
const NFTdetails = () => {
  return (
    <div>
      <NFTDetailsPage />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Brand />
    </div>
  )
} 

export default NFTdetails
