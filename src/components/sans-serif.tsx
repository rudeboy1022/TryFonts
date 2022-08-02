import React, { useState,useCallback, FC, ChangeEvent, useRef, useEffect } from 'react';
import {SketchPicker, ColorResult, ColorChangeHandler} from "react-color";
import { SansSerifTexts } from './texts/sansSerifTexts';
import { adjustButtonsStyle, buttonContainer, mq} from '../style/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const SansSerif: FC=  () => {

    //font-sizeの入力値を保持////////////////////////////////////////////////////////////////////////////////////////////////
    const [inputFontSizeValue, setInputFontSizeValue] = useState<number>(30);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-sizeのinputへの入力を処理/////////////////////////////////////////////////////////////////////////////////////////
    const handleFontSizeValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontSizeValue(Number(e.target.value));
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-weightの入力値を保持////////////////////////////////////////////////////////////////////////////////////////////////
    const [inputFontWeightValue, setInputFontWeightValue] = useState<number>(100);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //font-weightのinputへの入力を処理/////////////////////////////////////////////////////////////////////////////////////////
    const handleFontWeightValue = (e: ChangeEvent<HTMLInputElement>) => setInputFontWeightValue(Number(e.target.value));
     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     //color-pickerでのbackgroundに関する値を保持//////////////////////////////////////////////////////////////////////////////
    const [backgroundColor, setBackgroundColor] = useState<ColorResult>();
    const {rgb} = backgroundColor || {};
    const updateBackgroundColor = useCallback((backgroundColor: ColorResult) => setBackgroundColor(backgroundColor), [backgroundColor]);
    
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

    //backgroundの上辺の高さ,右辺の位置の値を取得、保持////////////////////////////////////////////////////////////////////////////////////
    const [clientTop, setClientTop] = useState<number>();
    const [clientRight, setClientRight] = useState<number>();
    
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clientTopValue: number | undefined = divRef.current?.getBoundingClientRect().top;
        setClientTop(clientTopValue);
        const clientRightValue: number | undefined = divRef.current?.getBoundingClientRect().x;
        setClientRight(clientRightValue);
    }, []);

    const clientTopPx = `top: ${clientTop}px`;
    const clientRightPx = `right: ${clientRight}px`;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [textColorHex, setTextColorHex] = useState<ColorResult | undefined>();
    
    const copyWord = `color: ${textColorHex?.hex}; \n background: ${backgroundColor?.hex};`;
    
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
        &:active{
            filter: brightness(60%);
            transition-duration: 0;
        }
    `

    const sansSerifBackGroundContainerStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: inherit;
        padding: 40%;
        border: 1px solid black;
        background-color: ${backgroundColor?.hex};
        animation: 0.3s;
        &:hover{
            button{
                opacity: 1;
            }
        }
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
            <div className='sansSerifBackGroundContainer' css={sansSerifBackGroundContainerStyle} ref={divRef}>
                <SansSerifTexts fontSize={inputFontSizeValue} fontWeight={inputFontWeightValue} toggle={isSansSerifTextToggle} clientTopPx={clientTopPx} setTextColorHex = {setTextColorHex}/>
                <button onClick={()=>{navigator.clipboard.writeText(copyWord)}} css={clipboardCopyButtonStyle}>
                    <FontAwesomeIcon icon={faCopy} size="2x"/>
                </button>
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