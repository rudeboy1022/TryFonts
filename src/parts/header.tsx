import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../style/style";

export const Header = () => {
  const headerStyle = css`
    width: 100%;
    height: 7vh;
    background-color: rgba(207, 243, 236, 1);
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10000;
  `;

  const LogoStyle = css`
    color: white;
    background-color: black;
    padding: 0 10px;
    border-radius: 10px;
    font-weight: 900;
    margin-left: 5%;
    ${mq[0]} {
      font-size: 100%;
    }
    ${mq[1]} {
      font-size: 20px;
    }
    ${mq[2]} {
      font-size: 25px;
    }
    ${mq[3]} {
      font-size: 35px;
    }
  `;

  const subLogoStyle = css`
    margin-right: 5%;
    ${mq[0]} {
      font-size: 70%;
    }
    ${mq[1]} {
      font-size: 100%;
    }
  `;

  return (
    <header css={headerStyle}>
      <h1 className="logo" css={LogoStyle}>
        Logo
      </h1>
      <h2 css={subLogoStyle}>Try Some Fonts and BackGround</h2>
    </header>
  );
};
