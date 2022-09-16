import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Div, screenSizes } from "../styles/BaseStyles";
import { Input } from "../components";
import SharpButton from "../components/Button/SharpButton";

interface PropsStyle {
  color?: any,
}

const DivWidth = styled(Div)`
  max-width: 600px;

  @media screen and (max-width: ${screenSizes.xxl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.sm + "px"}) {
    width: 92%;
  }
  @media screen and (max-width: ${screenSizes.xs + "px"}) {
  }
`

interface Props {
};

function SignUpPage({} : Props) {
  const [ nickname, setNickname ] = useState("");
  const [ helpMsg, setHelpMsg ] = useState("\u00A0");
  const [ color, setColor] = useState("--grey-650");

  const [account, setAccount] = useState("");

  const dupCheck = () => {
    console.log(nickname);
  }

  const EXTENSION_DOWNLOAD_URL = 'https://metamask.io';
  
  const walletConnect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        if(window.confirm("노 메타마스크. 설치 고?")) {
          window.open(EXTENSION_DOWNLOAD_URL, '_blank');
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 계정이 바뀌면 account의 상태 업데이트 
  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function (accounts : any) {
      setAccount(accounts[0]);
    });
  }

  return (
    <>
    <Div 
      display="flex"
      alignItems="center" justifyContent="center"
      h="calc(100vh - 120px)"
    >      
      <DivWidth 
        display="flex" flexDirection="column" gap="2rem"
      >
        <Div 
          display="flex" flexDirection="column" 
          alignItems="center" justifyContent="center"
          gap="0.5rem"
        >
          <Div fontSize="--h3" fontWeight="--bold">
            닉네임 등록하기
          </Div>
          <Div fontSize="--h7" fontWeight="--thin" color="--carmine-100">
          ※ 닉네임은 추후 변경이 불가능합니다. 신중히 선택해주세요.
          </Div>
        </Div>
        <Div 
          display="flex" flexDirection="column"
          gap="0.5rem"
        >
          <Div display="flex"  borderRadius="4px">
            <Input fontSize="--h5" fontWeight="--regular" borderRadius="4px 0 0 4px"
              borderWidth="3px" borderColor={color} borderStyle="solid none solid solid"
              placeholder="닉네임을 입력해주세요." setValue={setNickname}
            />
            <SharpButton 
              fontSize="--h5" width="150px" height="auto" borderRadius="0 4px 4px 0" bg={color}
              borderWidth="3px" borderColor={color}
              onClick={dupCheck}
            >
              중복확인
            </SharpButton>
          </Div>
          <Div fontSize="--h7" fontWeight="--thin" color="--carmine-100" pl="calc(calc(var(--h5) / 1.5) + 3px)">
            {helpMsg}
          </Div>
        </Div>
        <SharpButton 
          fontSize="--h5" fontWeight="--bold"
          width="100%" height="69px" 
          borderWidth="3px" borderRadius="4px" bg="--grey-650"
          borderColor="--grey-650"
        >
          회원가입
        </SharpButton>
      </DivWidth>
      <SharpButton onClick={walletConnect}>지갑연결</SharpButton>
      <SharpButton onClick={() => console.log(account)}>계정출력</SharpButton>
    </Div>
    </>
  );
}

export default SignUpPage;
