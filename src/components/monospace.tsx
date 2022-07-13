import { useState,useCallback,useRef, useEffect,FC,ChangeEvent } from 'react';
import {SketchPicker, ColorResult} from "react-color";
import { MonoSpaceTexts } from './texts/monospaceTexts';
import { adjustButtonsStyle, buttonContainer, mq} from '../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const MonoSpace: FC = () => {

    const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
    const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontSizeValue(parseInt(e.target.value));

    const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
    const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontWeightValue(parseInt(e.target.value));
    
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>();

    const {rgb} = backgroundColor || {};

    const updateBackgroundColor = useCallback((backgroundColor: ColorResult) => setBackgroundColor(backgroundColor), []);

    const [isMonospaceTextToggle, setIsMonospaceTextToggle] = useState<boolean>(false);

    const [isMonospaceBackgroundToggle, setIsMonospaceBackgroundToggle] = useState<boolean>(false);

    const handleMonospaceTextToggle = () => {
        setIsMonospaceTextToggle(!isMonospaceTextToggle);
    }

    const handleMonospaceBackgroundToggle = () =>{
        setIsMonospaceBackgroundToggle(!isMonospaceBackgroundToggle);
    }

    const [clientTop, setClientTop] = useState<number>();

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clientTopValue = divRef.current?.getBoundingClientRect().top;
        setClientTop(clientTopValue);
    }, []);

    const clientTopPx = `top: ${clientTop}px`;

    const monospaceContainerStyle = css`
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

    const monospaceBackGroundContainerStyle = css`
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
        <div id='monospaceContainer' css = {monospaceContainerStyle}>
            <h2>MonoSpace</h2>
            <div className='monospaceBackGroundContainer' style={{backgroundColor: backgroundColor?.hex}} css = {monospaceBackGroundContainerStyle} ref={divRef}>
                <MonoSpaceTexts fontSize={inputFontSizeValue} fontWeight={inputFontWeightValue} toggle = {isMonospaceTextToggle} clientTopPx={clientTopPx}/>
            </div>
            <SketchPicker width='150px' onChange={updateBackgroundColor} color = {rgb} css = {isMonospaceBackgroundToggle? sketchPickerActiveStyle : sketchPickerDefaultStyle}/>
            <div id='buttonContainer' css={buttonContainer}>
                <button type='button' onClick={handleMonospaceTextToggle} css={adjustButtonsStyle}>{isMonospaceTextToggle? "カラーピッカーを閉じる" : "文字色のカラーピッカー"}</button>
                <button type='button' onClick={handleMonospaceBackgroundToggle} css={adjustButtonsStyle}>{isMonospaceBackgroundToggle? "カラーピッカーを閉じる" : "背景色のカラーピッカー"}</button>
                <input type="number" onChange={handleFontSizeValue} min="1" placeholder="fontsize(px)" css={adjustButtonsStyle}/>
                <input type="number" onChange={handleFontWeightValue} step="100" min="100" max="900" placeholder="fontWeight" css={adjustButtonsStyle}/>
            </div>
        </div>
    )
}