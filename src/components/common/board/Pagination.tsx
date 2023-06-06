import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { ReactComponent as Next } from "../../../assets/icons/Next.svg";
import { ReactComponent as DoubleNext } from "../../../assets/icons/DoubleNext.svg";
import { ReactComponent as Previous } from "../../../assets/icons/Previous.svg"
import { ReactComponent as DoublePrevious } from "../../../assets/icons/DoublePrevious.svg"

interface PaginationProps {
  total : number;
  limit : number;
  page : number;
  setPage : Dispatch<SetStateAction<number>>;//setState 값을 넘겨야해서 지정해준 타입 
}

const Pagination:React.FC<PaginationProps> = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  const showList = new Array(numPages).fill(0);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 10) + 1;
  let lastNum = currPage - (currPage % 10) + 10;

  console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page, "lastPage": lastNum, numPages })
  showList.map(( _, idx ) => console.log("idx:::",idx))
  
  return (
    <Nav>
      <PageButton onClick={ () => {setPage( page - 5 ); setCurrPage( page - 2);}} disabled={page === 1}>
        <DoublePrevious className="arrowBtn double" />
      </PageButton>      
      <PageButton onClick={ () => {setPage( page - 1 ); setCurrPage( page - 3);}} disabled={page === 1}>
        <Previous className="arrowBtn" />
      </PageButton>
      <PageButton
        onClick={ () => setPage( page - 1 ) }
        className={ page === firstNum ?  "page" : "" }
      >
        {firstNum}
      </PageButton>
      {
        showList.map(( _, idx ) => {
          if(idx <= 8){
            return(
              <PageButton 
              key={ idx + 1 }
              onClick={ () => setPage(firstNum + 1 + idx)}
              className={ page === firstNum + 1 + idx ?  "page" : "" }
            >
              { firstNum + 1 + idx }
            </PageButton>
            )
          }
          else if(idx >= numPages){
            return(
              <PageButton 
              key={ idx + 1 }
              onClick={ () => setPage(lastNum)}
              className={ page === lastNum ?  "page" : "" }
            >
              { lastNum }
            </PageButton>
            )
          }
        })
        
      }
      <PageButton onClick={ () => { setPage( page + 1 ); setCurrPage( page ) }} disabled={page === numPages}>
        <Next className="arrowBtn" />
      </PageButton>
      <PageButton onClick={ () => { setPage( page + 5 ); setCurrPage( page ) }} disabled={page === numPages}>
        <DoubleNext className="arrowBtn double next" />
      </PageButton>
    </Nav>
  );
}

export default Pagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin: 24px auto;
`

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  line-height: 19px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #28293D;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;

  &:hover{
    background: #EFEAFC;
    color: #5F30E2;
    cursor: pointer;
  }
  &:hover svg.arrowBtn path{
    fill:#5F30E2;
  }
  &[disabled]{
    background: transparent;
    cursor: revert;
  }
  &[disabled] svg.arrowBtn path{
    fill: #C7C9D9;
  }
  &.page{
    background: #5F30E2;
    color: #FFF;
    cursor: revert;
  }

  svg.arrowBtn path{
    transform: translate(-5px, -1px);
    fill: #28293D;
  }
  svg.arrowBtn.double path{
    transform: translate(-3px, -1px);
  }
  svg.arrowBtn.double.next path{
    transform: translate(-8px, -1px);
  }
`;

