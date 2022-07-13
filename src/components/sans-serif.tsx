import React, { useState,useCallback, FC, ChangeEvent, useRef, useEffect } from 'react';
import {SketchPicker, ColorResult} from "react-color";
import { SansSerifTexts } from './texts/sansSerifTexts';
import { adjustButtonsStyle, buttonContainer, mq} from '../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const SansSerif: FC=  () => {

    //font-sizeの入力値を保持////////////////////////////////////////////////////////////////////////////////////////////////
    const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-sizeのinputへの入力を処理/////////////////////////////////////////////////////////////////////////////////////////
    const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontSizeValue(parseInt(e.target.value));
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-weightの入力値を保持////////////////////////////////////////////////////////////////////////////////////////////////
    const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-weightのinputへの入力を処理/////////////////////////////////////////////////////////////////////////////////////////
    const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontWeightValue(parseInt(e.target.value));
     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //color-pickerでのbackgroundに関する値を保持//////////////////////////////////////////////////////////////////////////////
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>();
    const {rgb} = backgroundColor || {};
    const updateBackgroundColor = useCallback((backgroundColor: ColorResult) => setBackgroundColor(backgroundColor), []);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //color-pickerの表示非表示の値を保持////////////////////////////////////////////////////////////////////////////////////////
    const [isSansSerifTextToggle, setIsSansSerifTextToggle] = useState<boolean>(false);

    const [isSansSerifBackgroundToggle, setIsSansSerifBackgroundToggle] = useState<boolean>(false);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //color-pickerの表示非表示に関する入力を処理////////////////////////////////////////////////////////////////////////////////
    const handleSansSerifTextToggle = (e: React.FormEvent<HTMLButtonElement>) => {
        setIsSansSerifTextToggle(!isSansSerifTextToggle);        
    }

    const handleSansSerifBackgroundToggle = (e: React.FormEvent<HTMLButtonElement>) =>{
        setIsSansSerifBackgroundToggle(!isSansSerifBackgroundToggle);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //backgroundの上辺の高さの値を取得、保持////////////////////////////////////////////////////////////////////////////////////
    const [clientTop, setClientTop] = useState<number>();
    
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clientTopValue = divRef.current?.getBoundingClientRect().top;
        setClientTop(clientTopValue);
    }, []);

    const clientTopPx = `top: ${clientTop}px`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //cssエリア////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const sansSerifContainerStyle = css`
        width: 90%;
        height: 100%;
        border-radius: 5px;
        ${mq[2]}{
            width: 40%;
            height: 100%;
            border-radius: 5px;
        }
    `

    const sansSerifBackGroundContainerStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: inherit;
        padding: 40%;
        border: 1px solid black;
    `
    const sketchPickerDefaultStyle = css`
        display: none;
    `

    const sketchPickerActiveStyle = css`
        position: absolute;
        right: 0;
        ${clientTopPx};
        ${mq[2]}{
            margin-right: 10%;
        }
    `
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return(
        <div id='sansSerifContainer' css = {sansSerifContainerStyle}>
            <h2>Sans-Serif</h2>
            <div className='sansSerifBackGroundContainer' style={{backgroundColor: backgroundColor?.hex}} css={sansSerifBackGroundContainerStyle} ref={divRef}>
                <SansSerifTexts fontSize={inputFontSizeValue} fontWeight={inputFontWeightValue} toggle={isSansSerifTextToggle} clientTopPx={clientTopPx} />
            </div>
            <SketchPicker width='150px' onChange={updateBackgroundColor} color = {rgb} css={isSansSerifBackgroundToggle? sketchPickerActiveStyle : sketchPickerDefaultStyle}/>
            <div id='buttonContainer' css={buttonContainer}>
                <button type='button' onClick={(e) => handleSansSerifTextToggle(e)} css={adjustButtonsStyle}>{isSansSerifTextToggle? "カラーピッカーを閉じる" : "文字色のカラーピッカー"}</button>
                <button type='button'   onClick={(e)=>handleSansSerifBackgroundToggle(e)} css={adjustButtonsStyle}>{isSansSerifBackgroundToggle? "カラーピッカーを閉じる" : "背景色のカラーピッカー"}</button>
                <input type="number" onChange={handleFontSizeValue} placeholder="fontsize(px)" min="1" css={adjustButtonsStyle}/>
                <input type="number" onChange={handleFontWeightValue} placeholder="fontWeight" step="100" min="100" max="900" css={adjustButtonsStyle}/>
            </div>
        </div>
    )
}