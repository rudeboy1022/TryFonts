import React from 'react'

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { mq } from '../style/style'

export const Footer = () => {

    const footerStyle = css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15vh;
        background-color: grey;
    `

    const spanStyle = css`
        color: white;
        font-size: 90%;
    `

    const logoBackGroundStyle = css`
        padding: 10px 20px;
        background: linear-gradient(45deg, blue, black);
        border-radius: 4px;
    `
    const logoStyle = css`
        color: white;
        font-size: 20px;
        font-weight:900;
        text-shadow: 2px 2px 3px red, 0 0 1em green, 0 0 0.2em yellow;
    `

    return(
        <footer css = {footerStyle}>
            <span css={spanStyle}>Copyright © 2022 NONAME. All rights reserved.</span>
            <div css={logoBackGroundStyle}>
                <span css={logoStyle}>NONAME</span>
            </div>
        </footer>
    )
}