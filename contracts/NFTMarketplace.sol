// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
//INTERNAL IMPORT FOR NFT OPENZIPLINE
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint listingPrice=0.0020 ether;
    address payable owner;
    mapping (uint256 => MarketItem) private idMarketItem;
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );
    modifier onlyOwner {
        require(msg.sender==owner,"Only owner of the MarketPlace can change the lisitng price");
        _;
    }
    constructor() ERC721("NFT Metavarse Token","MYNFT"){
        owner==payable(msg.sender);
    }
    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner() {
        listingPrice = _listingPrice;
    }
    function getlisingPricr() public view returns (uint) {
        return listingPrice;
    }

   // NFT token FUNCTION 
   function createToken(string memory tokenURI,uint price) public payable  returns (uint) {
        _tokenIds.increment();
        uint newTokenId=_tokenIds.current();
        _mint(msg.sender,newTokenId);
        _setTokenURI(newTokenId,tokenURI);
        createMarketItem(newTokenId,price);
        return newTokenId;
   }
   // Market Item
   function createMarketItem(uint tokenId,uint price) private {
        require(price>0,"Price must be atleat 1");
        require(msg.value>=listingPrice,"Price must be greater then or equal to listing price");
        idMarketItem[tokenId]=MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        _transfer(msg.sender,address(this), tokenId);
        emit idMarketItemCreated(tokenId, msg.sender,address(this), price, false);
   }
   //FUNCTION FOR RESALE TOKEN
   function reSellToken(uint tokenId, uint price)public payable {
        require(idMarketItem[tokenId].owner==msg.sender,"Only item owner can resale the NFT");
        require(msg.value>=listingPrice,"Price must be greater then or equal to listing price");
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price=price;
        idMarketItem[tokenId].seller=payable(msg.sender);
        idMarketItem[tokenId].owner=payable(address(this));
        _itemsSold.decrement();
        _transfer(msg.sender,address(this), tokenId);
   }
   //MARKETSELL
   function createMarketSale(uint tokenId) public payable {
        uint price = idMarketItem[tokenId].price;
        require(msg.value==price,"Please submit the asking price in order to complete the purchase");
        idMarketItem[tokenId].owner=payable(msg.sender);
        idMarketItem[tokenId].sold=true;
        idMarketItem[tokenId].owner=payable(address(0));
        _itemsSold.increment();
        _transfer(address(this),msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
   }
   //UNSOLD NFT DATA
   function fetchMarketitems()public view returns (MarketItem[]memory) {
        uint itemCount=_tokenIds.current();
        uint unSoldItemCount=_tokenIds.current()- _itemsSold.current();
        uint currentIndex=0;
        MarketItem[] memory items = new MarketItem[](unSoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idMarketItem[i+1].owner==address(this)) {
                items[currentIndex]=idMarketItem[i+1];
                currentIndex++;
            }
        }
        return items; 
   }
   // PURCHASE ITEM
   function fetchMyNFT() public view returns (MarketItem[]memory) {
        uint totalCount= _tokenIds.current();
        uint itemCount=0;
        uint currentIndex =0;

        for (uint i = 0; i <totalCount; i++) {
            if (idMarketItem[i+1].owner==msg.sender) {
                itemCount ++;
            }
        }

        MarketItem[] memory items= new MarketItem[](itemCount);
        for (uint i = 0; i < totalCount; i++) {
            if (idMarketItem[i+1].owner==msg.sender) {
                items[currentIndex]=idMarketItem[i+1];
                currentIndex++;
            }
        }
        return items;
   }
   //SINGLE USER ITEMS
   function fetchItemsListed()public view  returns (MarketItem[]memory) {
        uint totalCount= _tokenIds.current();
        uint itemCount=0;
        uint currentIndex =0;
        for (uint i = 0; i < totalCount; i++) {
            if (idMarketItem[i+1].seller==msg.sender) itemCount++;

        }
        MarketItem[] memory items= new MarketItem[](itemCount);
        for (uint i = 0; i < totalCount; i++) {
            if (idMarketItem[i+1].seller==msg.sender) {
                items[currentIndex]=idMarketItem[i+1];
                currentIndex++;
            }
        }
        return items;
   }
}