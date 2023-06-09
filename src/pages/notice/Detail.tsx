import TrTag from "../../components/common/board/table/TrTag";
import ColGroupTag from "../../components/common/board/table/ColGroup";

import { BoardBg } from "../../components/common/board/BoardBg";
import { TableTag } from "../../components/common/board/table/TableTag";
import { SectionTag } from "../../components/common/board/table/SectionTag";
import styled from "styled-components";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input";


const Detail = () =>{

  const size = ['13%','13%','13%','13%','13%','13%','13%','13%'];

  return(
    <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: '1638px', margin: '0 auto'}}>
      <BoardBg margin="24px 0 0" width="100%">
        <TableTag>
          <ColGroupTag 
            trCount={size}
            widthSize={size}
          />
          <tbody>
            <TrTag 
              colSpan={7}
              thTitle="번호,제목"
              rowType="colSpanType"
            />
            <TrTag 
              thTitle={"카테고리,작성일,작성자,조회수"}
              rowType="default"
            />
          </tbody>
        </TableTag>
        <SectionTag>
          <DetailContent>
            게시판 내용입니다.
          </DetailContent>      
        </SectionTag>
      </BoardBg>
      <SectionTag margin="37px 0 47px" display="flex">
        <div style={{width: '168px'}}>
          <Button
            purpose="reportPost"
            content="글 신고하기"
            disabled={false}
            onClick={() => alert('팝업띄우기')}
          />
        </div>
      </SectionTag>
      <SectionTag padding="0 24px" margin=" 0 0 24px">
        <div style={buttonGroup}>
          <Input 
            value={''}//state 들어갈것
            onChange={e => e}
          />
          <div style={{width : '120px'}}>
            <Button
              purpose="base"
              content="등록"
              disabled={false}
              onClick={() => alert('팝업띄우기')}//로그인 x 면 로그인 팝업 아니면 댓글 500자 넘으면 등록하지 못하게 팝업
            />
          </div>
        </div>
      </SectionTag>
      <SectionTag padding="0 24px">
        
      </SectionTag>
    </div>
  )
}

export default Detail;

const DetailContent = styled.article`
  padding: 20px 10px 0;
  height: 553px;

  overflow: auto;
`
const buttonGroup = {
  'display' : 'flex',
  'align-items' : 'baseline',
  'gap' : '10px',
  'padding' : '0 34px'
}