import React, { useState } from 'react'
import styled from "styled-components";

interface SeasonProps {
    seasonList: string[];
    onSelect: (season: string) => void;
}

const SeasonModal = ({ seasonList, onSelect }: SeasonProps) => {
    const [isModalOpen, setModalOpen] = useState(true);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    }

    if (!isModalOpen) {
        return null;
    }

    return (
        <SeasonList>
            {seasonList.map((season, index) => (
                <SeasonItem
                    key={index}
                    onClick={() => {
                        onSelect(season);
                        toggleModal();
                    }}
                >
                    {season}
                </SeasonItem>
            ))}
        </SeasonList>
    )
}

export default SeasonModal

const SeasonList = styled.ul`
  position: absolute;
  left: calc(50% - 80px);
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  width: 150px;
  padding: 5px 0;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  z-index: 1;

  &::-webkit-scrollbar {
  display: none;
}
`;

const SeasonItem = styled.li`
  width: 100%;
  line-height: 2em;

  &:hover {
    background-color: #EFEAFC;
  }
`;