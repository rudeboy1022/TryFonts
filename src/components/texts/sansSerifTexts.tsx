import React, { useContext, useEffect} from 'react';
import { useState,useCallback, FC } from 'react';
import { TextsContext } from '../../Provider/TextContextsProvider';
import {SketchPicker, ColorResult} from "react-color";
import type { TextsProps } from '../../types/TextsProps';
import { mq } from '../../style/style';

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const SansSerifTexts: FC<TextsProps>=  (props) => {

    //指定された文字を読み取り///////////////////////////////////////
    const {text, setText} = useContext(TextsContext);
    ///////////////////////////////////////////////////////////////

    //color-pickerで指定されるcolorの保持////////////////////////////////////////////////////////////
    const [textColor, setTextColor] = useState<ColorResult>();

    const {rgb} = textColor || {};

    const updateTextColor = useCallback((textColor: ColorResult) => setTextColor(textColor), []);
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //font-sizeの値のprops//////////////////////////
    const fontSize = props.fontSize;
    //font-weightの値のprops////////////////////////
    const fontWeight = props.fontWeight;
    //color-pickerの表示非表示に関するprops//////////
    const isSansSerifActive = props.toggle;
    //backgroundの上辺の値のprops///////////////////
    const clientTopPx = props.clientTopPx;
    //文字色のHEXを親要素へ返すためのsetStateActionのprops/////
    const setTextColorHex = props.setTextColorHex;
    //文字のalignの値を受け取り////////////////////////////
    const textAlignValue = props.textAlignValue;

    useEffect(()=>{
        if(setTextColorHex){
            setTextColorHex(textColor);
        }
    });

    //cssエリア/////////////////////////////////////
    const sansSerifTextStyle = css`
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
        font-family: sans-serif;
        white-space: pre-wrap;
        text-align: ${textAlignValue};
    `
    //////////////////////////////////////////////////////////////////////////////////

    return(
        <div id='sansSerifText' css={sansSerifTextStyle}>
            <p style={{fontSize: fontSize, fontWeight: fontWeight}} className={"sansSerif"} css={textStyle}>{text}</p>
            <SketchPicker width="150px" onChange={updateTextColor} color = {rgb} css={isSansSerifActive? sketchPickerActiveStyle : sketchPickerDefaultStyle}/>
        </div>
    )
}