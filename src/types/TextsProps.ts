import { Dispatch, SetStateAction } from "react";
import { ColorResult } from "react-color";

export type TextsProps = {
    fontSize: number | string;
    fontWeight: number | string;
    toggle?: boolean;
    clientTopPx? : string | undefined;
    setTextColorHex? : Dispatch<SetStateAction<ColorResult|undefined>>;
    textAlignValue? : string;
}