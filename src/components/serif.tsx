import { useState,useCallback,useRef,useEffect, FC, ChangeEvent } from 'react';
import {SketchPicker, ColorResult} from "react-color";
import { SerifTexts } from './texts/serifTexts';
import { adjustButtonsStyle, buttonContainer, mq} from '../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const Serif: FC = () => {

    const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
    const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontSizeValue(parseInt(e.target.value));

    const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
    const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontWeightValue(parseInt(e.target.value));
    
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>();

    const {rgb} = backgroundColor || {};

    const updateBackgroundColor = useCallback((backgroundColor: ColorResult) => setBackgroundColor(backgroundColor), []);

    const [isSerifTextToggle, setIsSerifTextToggle] = useState<boolean>(false);

    const [isSerifBackgroundToggle, setIsSerifBackgroundToggle] = useState<boolean>(false);

    const handleSerifTextToggle = () => {
        setIsSerifTextToggle(!isSerifTextToggle);
    }

    const handleSerifBackgroundToggle = () =>{
        setIsSerifBackgroundToggle(!isSerifBackgroundToggle);
    }

    const [clientTop, setClientTop] = useState<number>();
    
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clientTopValue = divRef.current?.getBoundingClientRect().top;
        setClientTop(clientTopValue);
    }, []);

    const clientTopPx = `top: ${clientTop}px`;

    const serifContainerStyle = css`
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

    const serifBackGroundContainerStyle = css`
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
        <div id='serifContainer' css = {serifContainerStyle}>
            <h2>Serif</h2>
            <div className='serifBackGroundContainer' style={{backgroundColor: backgroundColor?.hex}} css={serifBackGroundContainerStyle} ref={divRef}>
                <SerifTexts fontSize={inputFontSizeValue} fontWeight={inputFontWeightValue} toggle={isSerifTextToggle} clientTopPx={clientTopPx}/>
            </div>
            <SketchPicker width='150px' onChange={updateBackgroundColor} color = {rgb} css={isSerifBackgroundToggle? sketchPickerActiveStyle : sketchPickerDefaultStyle}/>
            <div id='buttonContainer' css={buttonContainer}>
                <button type='button' onClick={handleSerifTextToggle} css={adjustButtonsStyle}>{isSerifTextToggle? "カラーピッカーを閉じる" : "文字色のカラーピッカー"}</button>
                <button type='button' onClick={handleSerifBackgroundToggle} css={adjustButtonsStyle}>{isSerifBackgroundToggle? "カラーピッカーを閉じる" : "背景色のカラーピッカー"}</button>
                <input type="number" onChange={handleFontSizeValue} min="1" placeholder="fontsize(px)" css={adjustButtonsStyle}/>
                <input type="number" onChange={handleFontWeightValue} placeholder="fontWeight" step="100" min="100" max="900" css={adjustButtonsStyle}/>
            </div>
        </div>
    )
}