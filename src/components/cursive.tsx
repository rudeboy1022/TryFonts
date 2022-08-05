import React from "react";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
} from "react";
import { SketchPicker, ColorResult } from "react-color";
import { CursiveTexts } from "./texts/cursiveTexts";
import { adjustButtonsStyle, buttonContainer, mq } from "../style/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Cursive: FC = () => {
  const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
  const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setInputFontSizeValue(Number(e.target.value));

  const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
  const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) =>
    setInputFontWeightValue(Number(e.target.value));

  const [backgroundColor, setBackgroundColor] = useState<ColorResult>();

  const { rgb } = backgroundColor || {};

  const updateBackgroundColor = useCallback(
    (backgroundColor: ColorResult) => setBackgroundColor(backgroundColor),
    []
  );

  const [isCursiveTextToggle, setIsCursiveTextToggle] =
    useState<boolean>(false);

  const [isCursiveBackgroundToggle, setIsCursiveBackgroundToggle] =
    useState<boolean>(false);

  const handleCursiveTextToggle = () => {
    setIsCursiveTextToggle(!isCursiveTextToggle);
  };

  const handleCursiveBackgroundToggle = () => {
    setIsCursiveBackgroundToggle(!isCursiveBackgroundToggle);
  };

  const [clientTop, setClientTop] = useState<number>();
  const [clientRight, setClientRight] = useState<number>();

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clientTopValue: number | undefined =
      divRef.current?.getBoundingClientRect().top;
    setClientTop(clientTopValue);
    const clientRightValue: number | undefined =
      divRef.current?.getBoundingClientRect().x;
    setClientRight(clientRightValue);
  }, []);

  const clientTopPx = `top: ${clientTop}px`;
  const clientRightPx = `right: ${clientRight}px`;

  const [textColorHex, setTextColorHex] = useState<ColorResult | undefined>();

  const copyWord = `color: ${textColorHex?.hex}; \n background: ${backgroundColor?.hex};`;

  const [textAlignValue, setTextAlignValue] = useState<string>("center");

  const handleTextAlignLeftButtonCkick = () => {
    setTextAlignValue("left");
  };

  const handleTextAlignCenterButtonClick = () => {
    setTextAlignValue("center");
  };

  const handleTextAlignRightButtonClick = () => {
    setTextAlignValue("right");
  };

  const cursiveContainerStyle = css`
    width: 90%;
    height: 100%;
    border-radius: 5px;
    ${mq[2]} {
      width: 40%;
      height: 100%;
      border-radius: 5px;
    }
  `;

  const clipboardCopyButtonStyle = css`
    position: absolute;
    ${clientRightPx};
    ${clientTopPx};
    z-index: 1000;
    border: none;
    background-color: #a8b3bf;
    padding: 0 2px;
    border-radius: 5px;
    opacity: 0;
    transition-duration: 0.3s;
    &:active {
      filter: brightness(60%);
      transition-duration: 0;
    }
  `;

  const cursiveBackGroundContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: inherit;
    padding: 40%;
    border: 1px solid black;
    background-color: ${backgroundColor?.hex};
    &:hover {
      button {
        opacity: 1;
      }
    }
  `;

  const sketchPickerActiveStyle = css`
    position: absolute;
    right: 0;
    ${clientTopPx};
    ${mq[2]} {
      margin-right: 10%;
    }
  `;

  const sketchPickerDefaultStyle = css`
    display: none;
  `;

  const alignButtonsStyle = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: ${clientRight}px;
    top: ${clientTop}px;
    button {
      margin-top: 5%;
      opacity: 0;
      transition-duration: 0.3s;
      ${mq[2]} {
        font-size: 1.5em;
      }
    }
  `;

  return (
    <div id="cursiveContainerStyle" css={cursiveContainerStyle}>
      <h2>Cursive</h2>
      <div
        className="cursiveBackGroundContainer"
        css={cursiveBackGroundContainerStyle}
        ref={divRef}
      >
        <CursiveTexts
          fontSize={inputFontSizeValue}
          fontWeight={inputFontWeightValue}
          toggle={isCursiveTextToggle}
          clientTopPx={clientTopPx}
          setTextColorHex={setTextColorHex}
          textAlignValue={textAlignValue}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(copyWord);
          }}
          css={clipboardCopyButtonStyle}
        >
          <FontAwesomeIcon icon={faCopy} size="2x" />
        </button>
        <div id="alignButtons" css={alignButtonsStyle}>
          <button onClick={handleTextAlignLeftButtonCkick}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button onClick={handleTextAlignCenterButtonClick}>
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button onClick={handleTextAlignRightButtonClick}>
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
        </div>
      </div>
      <SketchPicker
        width="150px"
        onChange={updateBackgroundColor}
        color={rgb}
        css={
          isCursiveBackgroundToggle
            ? sketchPickerActiveStyle
            : sketchPickerDefaultStyle
        }
      />
      <div id="buttonContainer" css={buttonContainer}>
        <button
          type="button"
          onClick={handleCursiveTextToggle}
          css={adjustButtonsStyle}
        >
          {isCursiveTextToggle
            ? "カラーピッカーを閉じる"
            : "文字色のカラーピッカー"}
        </button>
        <button
          type="button"
          onClick={handleCursiveBackgroundToggle}
          css={adjustButtonsStyle}
        >
          {isCursiveBackgroundToggle
            ? "カラーピッカーを閉じる"
            : "背景色のカラーピッカー"}
        </button>
        <input
          type="number"
          onChange={handleFontSizeValue}
          min="1"
          placeholder="fontsize(px)"
          css={adjustButtonsStyle}
        />
        <input
          type="number"
          onChange={handleFontWeightValue}
          step="100"
          min="100"
          max="900"
          placeholder="fontWeight"
          css={adjustButtonsStyle}
        />
      </div>
    </div>
  );
};
