import React from "react";
import Avatar from "@mui/material/Avatar";

type ProfileImageProps = {
  currentUser: {
    nickname: string;
    img: string;
  };
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const ProfileImage = ({ currentUser, onClick }: ProfileImageProps) => {
  const { nickname, img } = currentUser;
  return (
    <Avatar
      alt={nickname}
      src={img}
      sx={{ width: 60, height: 60, cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default ProfileImage;
