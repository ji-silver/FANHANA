import React from "react";
import styled from "styled-components";

import TeamSelectContainer from "./TeamSelectContainer";

interface TeamListProps {
  teamList: {
    id: number;
    name: string;
    category: number;
    img: string;
  }[];
  selectedTeam: number;
  onSelect: (id: number) => void;
  category: number;
}

const TeamList = ({
  teamList,
  selectedTeam,
  onSelect,
  category,
}: TeamListProps) => {
  return (
    <List>
      <TeamSelectContainer
        team={{ id: 0, name: "전체", category: category, img: "" }}
        isSelected={selectedTeam === 0}
        onSelect={onSelect}
      />
      {teamList.map((team) => (
        <TeamSelectContainer
          key={team.id}
          team={team}
          isSelected={team.id === selectedTeam}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
};

export default TeamList;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
