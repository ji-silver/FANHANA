import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100vw;
    height: 100px;
`

const HeaderWrap = styled.div`
    max-width: 1596px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Button = styled.button`
    all: unset;
    margin-left: 20px;
    cursor: pointer;
    padding: 5px 10px;
`

const Logo = styled.div`
    display: flex;
    align-items: end;
    color: #5546B7;
`


const Header = () => {
    return (
        <HeaderContainer>
            <HeaderWrap>
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <Logo>
                        <img src="/images/logo.png" alt="" style={{ width: '70px', height: 'auto' }} />
                        <span style={{ fontSize: "30px", fontWeight: "bold" }}>FANHANA</span>
                    </Logo>
                </Link>
                <div>
                    <Button>로그인</Button>
                    <Button>회원가입</Button>
                </div>
            </HeaderWrap>
        </HeaderContainer>
    )
}

export default Header
