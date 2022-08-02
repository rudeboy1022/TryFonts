import React, { useContext, ChangeEvent } from 'react';
import { useState,useCallback,useEffect, FC } from 'react';
import { TextsContext } from '../../Provider/TextContextsProvider';
import {SketchPicker, ColorResult} from "react-color";
import type { TextsProps } from "../../types/TextsProps";
import { mq } from '../../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"



export const SerifTexts: FC<TextsProps> = (props) => {
    const {text, setText} = useContext(TextsContext);
    
    const [textColor, setTextColor] = useState<ColorResult>();

    const {rgb} = textColor|| {};
    const updateTextColor = useCallback((textColor: ColorResult) => setTextColor(textColor), []);

    const fontSize = props.fontSize;
    const fontWeight = props.fontWeight;
    const isSerifActive = props.toggle;
    const clientTopPx = props.clientTopPx;
    const setTextColorHex = props.setTextColorHex;

    useEffect(()=>{
        if(setTextColorHex){
            setTextColorHex(textColor);
        }
    })

    const serifTextStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    `

    const sketchPickerDefaultStyle = css`
        display: none;
    `

    const sketchPickerActiveStyle = css`
        position: absolute;
        ${clientTopPx};
        left: 0;
        ${mq[2]}{
            margin-left: 10%;
        }
    `

    const textStyle = css`
        position: absolute;
        left: auto;
        top: auto;
        color: ${textColor?.hex};
        font-family: serif;
        white-space: pre-wrap;
        text-align: center;
    `

    return(
        <div id='serifText' css={serifTextStyle}>
            <p style={{fontSize: fontSize, fontWeight: fontWeight}} css={textStyle}>{text}</p>
            <SketchPicker width='150px' onChange={updateTextColor} color = {rgb} css={isSerifActive? sketchPickerActiveStyle : sketchPickerDefaultStyle}/>
        </div>
    )
}