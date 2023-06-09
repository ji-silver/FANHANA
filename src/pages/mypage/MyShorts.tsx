import React from "react";
import styled from "styled-components";
import Image from "../../components/common/Image";

const MyShorts = () => {
  return (
    <MyShortsContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
      <ImageContainer>
        <Image
          src="https://cdn.pixabay.com/photo/2023/05/28/05/34/bird-8022869_640.jpg"
          alt="사진"
        ></Image>
      </ImageContainer>
    </MyShortsContainer>
  );
};

export default MyShorts;

const MyShortsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 10px;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 320px;

  @media (max-width: 1400px) {
    width: 170px;
    height: 230px;
  }
`;
