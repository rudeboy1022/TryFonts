import React from 'react';
import { useState, useCallback, useRef, useEffect, FC, ChangeEvent } from 'react';
import {SketchPicker, ColorResult} from "react-color";
import { CursiveTexts } from './texts/cursiveTexts';
import { adjustButtonsStyle, buttonContainer, mq} from '../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const Cursive: FC = () => {

    const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
    const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontSizeValue(parseInt(e.target.value));

    const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
    const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontWeightValue(parseInt(e.target.value));
    
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>();

    const {rgb} = backgroundColor || {};

    const updateBackgroundColor = useCallback((backgroundColor: ColorResult) => setBackgroundColor(backgroundColor), []);

    const [isCursiveTextToggle, setIsCursiveTextToggle] = useState<boolean>(false);

    const [isCursiveBackgroundToggle, setIsCursiveBackgroundToggle] = useState<boolean>(false);

    const handleCursiveTextToggle = () => {
        setIsCursiveTextToggle(!isCursiveTextToggle);
    }

    const handleCursiveBackgroundToggle = () =>{
        setIsCursiveBackgroundToggle(!isCursiveBackgroundToggle);
    }

    const [clientTop, setClientTop] = useState<number>();

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clientTopValue = divRef.current?.getBoundingClientRect().top;
        setClientTop(clientTopValue);
    }, []);

    const clientTopPx = `top: ${clientTop}px`;

    const cursiveContainerStyle = css`
        width: 90%;
        height: 100%;
        border-radius: 5px;
        ${mq[2]}{
            width: 40%;
            height: 100%;
            border-radius: 5px;
        }
    `

    const h2TitleStyle = css`
        position: absolute;

    `

    const cursiveBackGroundContainerStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: inherit;
        padding: 40%;
        border: 1px solid black;
    `

    const sketchPickerActiveStyle = css`
        position: absolute;
        right: 0;
        ${clientTopPx};
        ${mq[2]}{
            margin-right: 10%;
        }
    `

    const sketchPickerDefaultStyle = css`
        display: none;
    `

    return(
        <div id='cursiveContainerStyle' css = {cursiveContainerStyle}>
            <h2>Cursive</h2>
            <div className='cursiveBackGroundContainer' style={{backgroundColor: backgroundColor?.hex}} css={cursiveBackGroundContainerStyle} ref={divRef}>
                <CursiveTexts fontSize={inputFontSizeValue} fontWeight={inputFontWeightValue} toggle = {isCursiveTextToggle} clientTopPx={clientTopPx}/>
            </div>
            <SketchPicker width='150px' onChange={updateBackgroundColor} color = {rgb} css={isCursiveBackgroundToggle? sketchPickerActiveStyle: sketchPickerDefaultStyle}/>
            <div id='buttonContainer' css={buttonContainer}>
                <button type='button' onClick={handleCursiveTextToggle} css={adjustButtonsStyle}>{isCursiveTextToggle? "カラーピッカーを閉じる" : "文字色のカラーピッカー"}</button>
                <button type='button' onClick={handleCursiveBackgroundToggle} css={adjustButtonsStyle}>{isCursiveBackgroundToggle? "カラーピッカーを閉じる" : "背景色のカラーピッカー"}</button>
                <input type="number" onChange={handleFontSizeValue} min="1" placeholder="fontsize(px)" css={adjustButtonsStyle}/>
                <input type="number" onChange={handleFontWeightValue} step="100" min="100" max="900" placeholder="fontWeight" css={adjustButtonsStyle}/>
            </div>
        </div>
    )
}