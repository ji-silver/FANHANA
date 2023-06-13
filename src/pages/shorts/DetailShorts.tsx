import React from "react";
import { useLocation } from "react-router-dom";

import Shorts from "./shorts";

interface DetailShortsProps {
  id: number;
  category?: number;
}

const DetailShorts = () => {
  const location = useLocation();

  const preCategory = location.state;
  const shortsId = location.state;

  const detailShortsProps: DetailShortsProps = {
    id: shortsId,
    category: preCategory,
  };

  return <Shorts {...detailShortsProps} />;
};

export default DetailShorts;
