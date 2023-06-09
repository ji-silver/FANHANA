import axios from "axios";

const getBoardData = () => {
  axios
    .get("http://localhost:5500/api/v1/post/main/1")
    .then((결과) => {
      console.log(결과.data);
    })
    .catch(() => {
      console.log("실패함");
    });
};

export { getBoardData };
