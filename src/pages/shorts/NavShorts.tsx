import React from "react";
import { useLocation } from "react-router-dom";

import Shorts from "./shorts";

interface NavShortsProps {
  category: number;
}

const NavShorts = () => {
  const location = useLocation();

  const preCategory = location.state;

  const navShortsProps: NavShortsProps = {
    category: preCategory,
  };

  return <Shorts {...navShortsProps} />;
};

export default NavShorts;
