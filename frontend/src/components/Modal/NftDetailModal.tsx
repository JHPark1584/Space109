import { useState, useEffect} from "react";
import styled, { keyframes } from "styled-components";
import { ModalPortal, Input, SharpButton, Loading } from "..";
import { Div, screenSizes } from "../../styles/BaseStyles";
import { SaleFactoryContract, SsafyNFTContract, SsafyNFTCA, SsafyTokenCA, SaleContract } from "../../web3Config";

interface PropsStyle{
  url?: any,
}

const On = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: var(--modal-bg);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  animation: ${On} 0.3s ease;
`

const Content = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  animation: ${On} 0.3s ease;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    gap: 2.5%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    flex-direction: column;
    gap: 1.5rem;
  }
  overflow: auto;

`

const ImageSection = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30%;
  height: 100vh;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 40%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 45%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 90%;
    height: 40%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {

  } 
`

const DetailSection = styled(Div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  width: 30%;
  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 40%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 45%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 90%;
    height: 40%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {

  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {

  }
`

const Image = styled.img.attrs<PropsStyle>(props => ({
  src: props.url,
  alt: "NFT ?????????",
  }))<PropsStyle>`
  width: 100%;
  height: 90%;
  object-fit: contain;

`

const Title = styled(Div)`
  color: var(--grey-100);
  font-size: var(--h1);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
  }
`

const TitleText = styled(Div)`
  color: var(--grey-400);
  font-size: var(--h5);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h6);
  }  
`

const TokenIdDiv = styled(Div)`
  color: var(--grey-400);
  font-size: var(--h3);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h4);
  }  
`

const ContentText = styled(Div)`
  color: var(--grey-100);
  font-size: var(--h5);
  font-weight: var(--bold);
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h6);
  }
`

function NftDetailModal (props:any) {

  const [ price, setPrice ] = useState<any>("");
  const [ saleStatus, setSaleStatus ] = useState<any>(false);
  const [ saleData, setSaleData ] = useState<any>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [helpText, setHelpText] = useState<string>("helpText");

  const SellNFT = async () => {
    if (!price || price <= 0) {
      alert("????????? ????????? ?????????????????????");
      return;
    }
    try {
      setLoading(true);
      setHelpText("?????? ?????? ???... ????????? ??????????????????(1/2)");
      const response = await SaleFactoryContract.methods.createSale(
        parseInt(props.tokenId), parseInt(price), SsafyTokenCA, SsafyNFTCA
      ).send({from : window.ethereum.selectedAddress});

      if (response.status) {
        setHelpText("?????? ?????? ???... ????????? ??????????????????(2/2)");
        const getSaleData = await SaleFactoryContract.methods.getSaleData(parseInt(props.tokenId)).call();
        const response2 = await SsafyNFTContract.methods.setApprovalForAll(getSaleData.saleAddress, true).send({ from: window.ethereum.selectedAddress});
        setPrice(getSaleData.purchasePrice);
        setSaleData(getSaleData);
        setSaleStatus(true);
        setLoading(false);
        props.setCheck((pre:any) => !pre);
        alert("??????????????? ?????????????????????.")
      }
    } catch (error) {
      setLoading(false);
      alert("?????? ????????? ?????????????????????.");
      console.error(error);
    }
  }

  const CancelSell = async () => {
    setLoading(true);
    setHelpText("?????? ????????? ???... ????????? ??????????????????");
    try {
      const response = await SaleContract(saleData.saleAddress).methods.cancelSales().send({ from: window.ethereum.selectedAddress});
      setSaleStatus(false);
      setSaleData("");
      setPrice("");
      setLoading(false);
      props.setCheck((pre:any) => !pre);
      alert("??????????????? ????????? ?????????????????????.")
      console.log("?????? ???????????????")
    } catch (e) {
      setLoading(false);
      alert("?????? ????????? ?????????????????????.")
      console.error(e);
    }
  }

  const getSaleInfo = async () => {
    const getSaleData = await SaleFactoryContract.methods.getSaleData(parseInt(props.tokenId)).call();
    console.log(getSaleData);
    setSaleData(getSaleData);
    return getSaleData.itemId;
  }

  const init = async () => {
    if(await getSaleInfo() === "0") {
      setSaleStatus(false);
    } else {
      setSaleStatus(true);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <>
    {loading && <Loading HelpText={helpText} />}
    <ModalPortal>
      <BackGround onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}
      >
      <Content onClick={(e) => {
        props.closeModal();
        e.stopPropagation();
      }}
      >
        <ImageSection>
          <Image url={props.image} />
        </ImageSection>
        <DetailSection onClick={(e) => {
          e.stopPropagation();
        }}>
          <TokenIdDiv>{`#` + props.tokenId.toString().padStart(4, '0')}</TokenIdDiv>
          <Title>{props.name}</Title>
          <Div display="flex" gap="3rem">
            <Div display="flex" flexDirection="column" gap="0.3rem">
              <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">?????????</TitleText>
              <ContentText color="--grey-100" fontWeight="--bold" fontSize="--h5">{props.author}</ContentText>
            </Div>
            <Div display="flex" flexDirection="column" gap="0.3rem">
              <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">?????????</TitleText>
              <ContentText color="--grey-100" fontWeight="--bold" fontSize="--h5">{props.nickname}</ContentText>
            </Div>
          </Div>
          <Div display="flex" flexDirection="column" gap="0.5rem">
            <TitleText color="--grey-400" fontWeight="--bold" fontSize="--h5">?????? ??????</TitleText>
            <ContentText color="--grey-100">{props.description}</ContentText>
          </Div>
          {
            saleStatus ? 
            <Div display="flex" gap="01rem">
              <Div display="flex" justifyContent="space-between" alignItems="center"
                w="70%" color="--grey-100" fontWeight="--bold" fontSize="--h5"
              >
                <Div color="--grey-400">
                  ?????? ??????&nbsp;
                </Div>
                <Div display="flex">
                  <Div>
                    {saleData.purchasePrice}&nbsp;
                  </Div>
                  <Div color="--grey-400">
                    SSF
                  </Div>
                </Div>
              </Div>
              <SharpButton 
                onClick={CancelSell}
                width="30%" bg="--grey-100" color="--grey-750" 
                borderColor="--grey-100" borderWidth="1px"
                fontSize="--h5"  
              >
                ????????????
              </SharpButton>
            </Div> :
            <Div display="flex" gap="0.5rem">
              <Input width="70%" placeholder="SSF" setValue={setPrice} type="number" value={price}/>
              <SharpButton 
                onClick={SellNFT}
                width="30%" bg="--grey-100" color="--grey-750" 
                borderColor="--grey-100" borderWidth="1px"
                fontSize="--h5"  
              >
                ????????????
              </SharpButton>
            </Div>
          }
        </DetailSection>
      </Content>
      </BackGround>
    </ModalPortal>
    </>
  );
}

export default NftDetailModal;