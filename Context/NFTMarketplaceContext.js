import React,{useState,useEffect,useContext} from 'react'
import wenb3Modal from 'web3modal'
import { ethers } from 'ethers'
import Router from 'next/router'
import axios from 'axios'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0")
//INTERNAL IMPORT 
import { NFTMarketplaceAddress,NFTMarketplaceABI } from './constant'
//--FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress,NFTMarketplaceABI,signerOrProvider)
//---CONNECTING WITH SMART CONTRACT
const connetingWithSmatContract=async()=>{
    try {
        const web3Modal =new wenb3Modal()
        const connection=await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract=fetchContract(signer)
        return contract
    } catch (error) {
        console.log("Something went wrong while conneting with Contract")
    }
}
export const NFTMarketplaceContext = React.createContext()
export const NFTMarketplaceProvider=(({children})=>{
    const titleData="Discover, collect, and sell NFTs"
   //----USESTATE
   const [currentAccount, setcurrentAccount] = useState('')
   //--CHECK IF WALLET IS CONNECTED
   const checkIfWalletConnected = async()=>{
    try {
        if (!window.ethereum) {
            return console.log('Install MetaMask');
        }
        const accounts= await window.ethereum.request({
            method: 'eth_accounts',
        })
        if (accounts.length) {
            setcurrentAccount(accounts[0])
        }else{console.log('No Account Found')}
        console.log(currentAccount)
    } catch (error) {
        console.log('Something went wrong while connecting to Wallet')
    }
   }
   useEffect(() => {
     checkIfWalletConnected
   }, [])
   
   //---CONNECT WALLET
   const connectWallet = async()=>{
    try {
        if (!window.ethereum) {
            return console.log('Install MetaMask');
        }
        const accounts= await window.ethereum.request({
            method: 'eth_requestAccounts',
        })
        setcurrentAccount(accounts[0])
        window.location.reload()
    } catch (error) {
        console.log('Error while connecting to Wallet')
    }
   }
   //--UPLOAD TO IPFS FUNCTION
   const uploadToIPFS = async(file)=>{
    try {
        const added =await client.add({content:file})
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        return url
    } catch (error) {
        console.log('Error in Uploading to IPFS')
    }
   }
   //---CREATENFT FUNCTION
   const createNFT = async(formInput, fileUrl, router)=>{
    
    const {name,description,price}=formInput
    if (!name||!description||!price||!fileUrl) {
        console.log('Data is Missing')
        const data = JSON.stringify({name,description,image:fileUrl})
        try {
            const added=await client.add(data)
            const url=`https://ipfs.infura.io/ipfs/${added.path}`
            await createSale(url,price)
        } catch (error) {
            console.log('Error in creating NFT')
        }
    }

    }
    //-----CREATESALE FUNCTION
    const createSale = async(url, formInputPrice, isReselling, id)=>{
        try {
            const price = ethers.utils.parseUnits(formInputPrice,"ether")
            const contract = await connetingWithSmatContract()
            const listingPrice= await contract.getlisingPricr()
            const transaction = !isReselling ? await contract.createToken(url,price,{value: listingPrice.toString()}):
            await contract.reSellToken(url,price, {value: listingPrice.toString()})
            await transaction.wait()
        } catch (error) {
            console.log('Error in creating sale')
        }
    }
    //---FETCHNFT
    const fetchNFT = async () =>{
        try {
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
            const data = await contract.fetchMarketitems()
            const items = await Promise.all(
                data.map(async({tokenId, seller, owner, price:unformattedPrice})=>{
                    const tokenURI = await contract.tokenURI(tokenId)
                    const{data:{image,name,description},}=await axios.get(tokenURI)
                    const price= ethers.utils.formatUnits( unformattedPrice.toString(),"ether")
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    }
                })
                
            )
            return items
        } catch (error) {
            console.log('Error while fetching NFT')
        }
    }
    //--FETCHING MY NFT OR LIST
    const fetchMyNFTsOrListedNFTs = async(type)=>{
        try {
            const contract = await connetingWithSmatContract()
            const data= type=='fetchItemsListed'? await contract.fetchItemsListed():await contract.fetchMyNFT()
            const items = await Promise.all(
                data.map(async({tokenId,seller,owner,price:unformattedPrice})=>{
                    const tokenURI= await contract.tokenURI(tokenId)
                    const{
                        data:{image, name, description},
                    }= await axios.get(tokenURI)
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),'ether'
                    )
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI
                    }
                })
            )
            return items
        } catch (error) {
            console.log("Error while fetching listed NFTs")
        }
    }
    //--BUY NFT FUNCTION
    const buyNFT = async(nft)=>{
        try {
            const contract =await connetingWithSmatContract()
            const price = ethers.utils.parseUnits(nft.price.toString(),'ether')
            const transaction= await contract.createMarketSale(nft.tokenId,{value: price})
            await transaction.wait()
        } catch (error) {
            console.log('Error while buying NFT')
        }
    }
    return(
        <NFTMarketplaceContext.Provider value={{
            checkIfWalletConnected,uploadToIPFS,connectWallet,createNFT,fetchNFT,fetchMyNFTsOrListedNFTs,buyNFT,currentAccount,titleData,}}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})
