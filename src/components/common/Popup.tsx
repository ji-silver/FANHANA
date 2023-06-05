import React from "react";
import Button,{ ButtonProps } from "./Button";
import styled from "styled-components";

interface PopupProps extends ButtonProps {
  title : string;
  count : 1 | 2 ;
}

const Popup: React.FC<PopupProps> = ({title, count, disabled, purpose, content}) => {

  return(
    <Bg>
      <StyledPopup>
        <h2>{title}</h2>
        <ButtonBox btnCount={count}>
          {
            count === 2 ? 
              <>
                <Button disabled={disabled} purpose={purpose} content={content} />
                <Button disabled={disabled} purpose={purpose} content={content} />
              </>
              :
              <Button disabled={disabled} purpose={purpose} content={content} />
          }
        </ButtonBox>
      </StyledPopup>
    </Bg>
  );
}

export default Popup;

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100%;
  background: rgba(85, 87, 112, 0.5);
  
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledPopup = styled.div`
  width: 345px;
  padding: 50px 0 14px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 3.20559px 32.0559px rgba(0, 0, 0, 0.08);

  h2{
    width: 224px;
    margin: 30px;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 20px;
    word-break: keep-all;
  }
`;

const ButtonBox = styled.div<{ btnCount: 1 | 2 }>`
  display: flex;
  justify-content: ${ props => props.btnCount === 2 ? 'flex-end' : 'center'};
  align-items: center;
`;
