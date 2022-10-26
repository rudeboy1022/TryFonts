import React from "react";
import { App } from "./App";
import { TextsContextsProvider } from "./Provider/TextContextsProvider";
import { createRoot } from "react-dom/client";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    background: rgb(240, 240, 242);
  }
`;

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <TextsContextsProvider>
      <App css={scrollbarStyle} />
    </TextsContextsProvider>
  </React.StrictMode>
);
