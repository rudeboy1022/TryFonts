/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const breakpoints = [240, 520, 960, 1200];

export const mq = breakpoints.map(
  (bp) => `@media screen and (min-width: ${bp}px)`
);

export const adjustButtonsStyle = css`
  width: 47%;
  padding: 3% 0;
  text-align: center;
  border-radius: 15px;
  line-height: 1.2;
  color: white;
  background-color: rgb(3, 252, 202);
  border: none;
  box-sizing: border-box;
  white-space: nowrap;
  margin-top: 3%;
  border: 1px solid grey;
  ::placeholder {
    color: white;
  }

  ${mq[0]} {
    font-size: 5px;
  }
  ${mq[1]} {
    font-size: 15px;
  }
  ${mq[2]} {
    font-size: 15px;
  }
  ${mq[3]} {
    font-size: 20px;
  }
`;

export const buttonContainer = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 5%;
`;
