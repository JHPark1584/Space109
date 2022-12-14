import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  forwardRef,
} from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
} from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import { Div, screenSizes } from "../../styles/BaseStyles";
import state from "./state";
import Section from "./Section";

// softShadows();

const flipin = keyframes`
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }
  
  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
}
`;

const Container = styled(Div)`
  box-sizing: border-box;
  width: 100%;
  max-width: 1800px;

  margin: 0 auto;

  @media (max-width: 1920px) {
    width: calc(100vw - 120px);
  }
  @media (max-width: 1366px) {
    width: calc(100vw - 64px);
  }
`;

const Center = styled.div`
  margin: 0 auto;
  width: 50%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--h1);
  color: var(--grey-400);
  font-weight: var(--bold);
  word-break: keep-all;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    font-size: var(--h3);
    width: 80%;
  }
  animation: ${flipin} 3s alternate infinite linear;
  position: absolute;

  ${({ bgColor }) => {
    if (bgColor === "--ocean-300") {
      return css`
        color: var(--ocean-200);
      `;
    } else if (bgColor === "--spinach-300") {
      return css`
        color: var(--spinach-200);
      `;
    } else if (bgColor === "--grape-100") {
      return css`
        color: var(--navy-100);
      `;
    }
  }}
`;

const BackCenter = styled.div`
  margin: 0 auto;
  width: 50%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: var(--h1);
  color: var(--grey-100);
  font-weight: var(--bold);
  word-break: keep-all;
  @media screen and (max-width: ${screenSizes.xl + "px"}) {
    width: 60%;
  }
  @media screen and (max-width: ${screenSizes.lg + "px"}) {
    font-size: var(--h2);
    width: 80%;
  }
  @media screen and (max-width: ${screenSizes.md + "px"}) {
    font-size: var(--h3);
    width: 80%;
  }
  position: absolute;
  color: transparent;

  -webkit-text-stroke: 0.1px var(--grey-100);

  ${({ bgColor }) => {
    if (bgColor === "--ocean-300") {
      return css`
        -webkit-text-stroke: 0.1px var(--grey-100);
      `;
    } else if (bgColor === "--spinach-300") {
      return css`
        -webkit-text-stroke: 0.1px var(--grey-100);
      `;
    } else if (bgColor === "--grape-100") {
      return css`
        -webkit-text-stroke: 0.1px var(--grey-100);
      `;
    }
  }}
`;

const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 120px);
  overflow: auto;
  z-index: 1;
`;

const NavArea = styled.div`
  height: 120px;
  color: transparent;
`;
// const Model = () => {
//   const gltf = useGLTF("/isabelle.glb");
//   return <primitive object={gltf.scene} dispose={null}/>;
// }

const GoGallery = styled.div`
  color: var(--grape-100);
  width: 80%;
  height: 25%;
  box-sizing: border-box;
`;

const Button = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: lightyellow;
  padding: 2rem 3rem;
  border: 3px solid lightyellow;
  position: relative;
  font-weight: var(--light);
  font-size: var(--h2);
  ::before,
  ::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    border: inherit;
    transition: all 0.5s;
  }
  ::before {
    top: -15px;
    left: -15px;
    border-width: 3px 0 0 3px;
  }
  ::after {
    bottom: -15px;
    right: -15px;
    border-width: 0 3px 3px 0;
  }
  :hover::before,
  :hover::after {
    width: calc(100% + 27px);
    height: calc(100% + 27px);
  }
  @media screen and (max-width: 1760px) {
    font-size: var(--h3);
  }
  @media screen and (max-width: 1500px) {
    font-size: var(--h4);
  }
  @media screen and (max-width: 1060px) {
    font-size: var(--h5);
  }
  @media screen and (max-width: 660px) {
    font-size: var(--h6);
    padding: 1rem 2rem;
    ::before {
      top: -10px;
      left: -10px;
    }
    ::after {
      bottom: -10px;
      right: -10px;
    }
    :hover::before,
    :hover::after {
      width: calc(100% + 16px);
      height: calc(100% + 16px);
    }
  }
`;

const LastContent = forwardRef(({ setClicked }, ref) => {
  return (
    <GoGallery ref={ref}>
      <Button onClick={() => setClicked(true)}>
        ?????? ?????? ????????? ???????????? ??????
      </Button>
    </GoGallery>
  );
});

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} castShadow />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <directionalLight position={[10, 0, 0]} intensity={1.5} />
      <directionalLight position={[0, 0, 10]} intensity={1} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HTMLContent = ({
  children,
  bgColor,
  positionY,
  domContent,
  setColor,
  color,
  scrollArea,
}) => {
  const mesh = useRef();
  useFrame(() => {

    mesh.current.rotation.y += 0.003
    mesh.current.rotation.x -= 0.002
    
  })

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView &&
      // scrollArea.current.style.background = `var(${bgColor})`
      (document.body.style.background = `var(${bgColor})`);
    if (inView) {
      if (bgColor === "--ocean-300") {
        setColor("lightblue");
      } else if (bgColor === "--spinach-300") {
        setColor("#648f82");
      } else if (bgColor === "--grape-100") {
        setColor("lightyellow");
      }
    }
  }, [inView]);

  return (
    <>
      <mesh ref={mesh} position={[58, 6, 10]} scale={50}>
        <boxGeometry attach="geometry" />
        <meshPhysicalMaterial attach="material" color={color} />
      </mesh>
      {/* <group>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -25, 0]}>
        <planeGeometry attach='geometry' args={[100, 100]}/>
        <shadowMaterial attach='material' color={"red"}/>
      </mesh>
    </group> */}
      <Section factor={1.5} offset={1}>
        <group position={[0, positionY, 0]}>
          <Html portal={domContent} fullscreen>
            <BackCenter ref={refItem} bgColor={bgColor}>
              {children}
            </BackCenter>
            <Center bgColor={bgColor}>{children}</Center>
          </Html>
        </group>
      </Section>
    </>
  );
};

const MainPage = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop;
  };
  const [color, setColor] = useState("white");
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (clicked) {
      navigate("/gallery");
    }
  }, [clicked]);

  return (
    <>
      <NavArea />
      <Div w="100%" h="calc(100vh - 120px)">
        <Container>
          <ScrollArea ref={scrollArea} onScroll={onScroll}>
            <div style={{ postion: "sticky", top: 0 }} ref={domContent}></div>
            <div
              style={{ height: "calc(100vh + 120px)" }}
              ref={domContent}
            ></div>
          </ScrollArea>
        </Container>
        <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
          <Lights />
          <OrbitControls />
          <Suspense fallback={null}>
            <HTMLContent
              domContent={domContent}
              positionY={260}
              setColor={setColor}
              bgColor="--ocean-300"
              scrollArea={scrollArea}
            >
              ?????? 109?????? ????????? ????????? NFT??? ????????? ????????? ????????????
              ??????????????????
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              positionY={10}
              setColor={setColor}
              bgColor="--spinach-300"
              scrollArea={scrollArea}
            >
              ?????? ?????? SSF??? ???????????? ????????? NFT??? ??????????????????
            </HTMLContent>
            <HTMLContent
              domContent={domContent}
              positionY={-240}
              setColor={setColor}
              bgColor="--grape-100"
              color={color}
              scrollArea={scrollArea}
            >
              <LastContent setClicked={setClicked} />
            </HTMLContent>
          </Suspense>
        </Canvas>
      </Div>
    </>
  );
};

export default MainPage;
