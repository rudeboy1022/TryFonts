import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { TextsContextsProvider } from './Provider/TextContextsProvider';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const scrollbarStyle = css`
  &::-webkit-scrollbar{
    background: rgb(240, 240, 242);
  }
`

ReactDOM.render(
  <React.StrictMode>
    <TextsContextsProvider>
      <App css={scrollbarStyle}/>
    </TextsContextsProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);