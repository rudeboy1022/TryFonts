////////For Testing ///////////

import { useState, useCallback,useContext, FC } from 'react';
import { TextsContext } from '../Provider/TextContextsProvider';
import {SketchPicker, ColorResult} from "react-color";

type Props = {
    fontFamily: string;
}

export const Texts: FC<Props> = (props) => {

    const {text, setText} = useContext(TextsContext);
    
    const [textColor, setTextColor] = useState<ColorResult>();

    const {rgb} = textColor|| {};
    const updateTextColor = useCallback((textColor: ColorResult) => setTextColor(textColor), []);

    const styleProps = {
        fontFamily: props.fontFamily,
        fontSize: "30px",
        color: textColor?.hex
    }

    return(
        <>
            <p style={styleProps}>{text}</p>
            <SketchPicker onChange={updateTextColor} color = {rgb}/>
        </>
    )
}

///////For Testing /////////////