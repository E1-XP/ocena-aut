"use client";
import Image from "next/image";
import styled from "@emotion/styled";

interface Props {
  darkText?: boolean;
}

const Main = ({ darkText }: Props) => {
  return (
    <ImageWrapper>
      <Image
        src={darkText ? "/images/logo_nm_light.png" : "/images/logo_nm.png"}
        alt="Nowe Motywacje company logo"
        width={220}
        height={42}
        style={{
          objectFit: "contain",
          objectPosition: "left center",
          transform: "scale(0.8)",
        }}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 40px;
`;

export default Main;
