const HOST = process.env.REACT_APP_BACKEND_HOST;

const WALLET = "/wallet";
const GALLERY = "/gallery";
const NFT = "/nft";

const apiPath = {
  wallet: {
    login: () => HOST + WALLET,
    join: () => HOST + WALLET + "/join",
    dupCheck: () => HOST + WALLET + "/check",
    sellCheck: () => HOST + WALLET + "/sellCheck",
  },
  gallery: {
    gallery: () => HOST + GALLERY + "/list",
    category: () => HOST + GALLERY,
    myGalleryInfo: () => HOST + GALLERY + "/my",
    theme: () => HOST + GALLERY + "/theme",
  },
  nft: {
    display: () => HOST + NFT + "/display",
    delete: () => HOST + NFT + "/deleteFrame",
    drop: () => HOST + NFT + "/sell",
  },
};

export default apiPath;
