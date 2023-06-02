import React, { useState } from "react";

import ProfilePopper from "./ProfilePopper";
import ProfileImage from "./ProfileImage";

// user 정보
const currentUser = {
  nickname: "sso",
  img: "https://avatars.githubusercontent.com/u/79398566?s=40&v=4",
};

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const id = isPopperOpen ? "profile-popper" : undefined;

  const onProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopperOpen(true);
  };

  const onClose = () => {
    setIsPopperOpen(false);
  };

  return (
    <>
      <ProfileImage
        currentUser={currentUser}
        onClick={onProfileClick}
        purpose="header"
      />
      <ProfilePopper
        currentUser={currentUser}
        id={id}
        open={isPopperOpen}
        anchorEl={anchorEl}
        onClose={onClose}
      />
    </>
  );
};

export default Profile;
