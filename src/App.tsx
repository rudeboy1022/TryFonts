import { FC, useState, ChangeEvent, useContext } from "react";
import { Header } from "./parts/header";
import { Footer } from "./parts/footer";
import { SansSerif } from "./components/sans-serif";
import { Serif } from "./components/serif";
import { MonoSpace } from "./components/monospace";
import { Cursive } from "./components/cursive";
import { Fantasy } from "./components/fantasy";
import { TextsContext } from "./Provider/TextContextsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { mq } from "./style/style";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const App: FC = () => {
  //指定する文字の入力値を保持////////////////////////
  const [inputValue, setInputValue] = useState<string>("");

  //保持した入力値をグローバルなstateとして読み取り更新保持/////////
  const { text, setText } = useContext(TextsContext);

  //文字の入力を処理/////////////////////////////////
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  //入力された文字の受け取りの処理////////////////////
  const onClickSubmit = () => {
    const typedTextAry = inputValue.split("\n");
    const modefiedText = typedTextAry.join(`\n`);
    setText(modefiedText);
    setInputValue("");
  };

  //CSSエリア///////////////////////////////////////
  const containerStyle = css`
    width: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: rgb(240, 240, 242);
  `;

  const inputAreaStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin-top: 5vh;
  `;

  const inputLabelStyle = css`
    font-weight: 800;
    text-align: center;
    padding-top: 7vh;
    width: 100%;
  `;

  const textInputStyle = css`
    resize: none;
    width: 75%;
    text-align: center;
    border: 2px solid black;
    border-radius: 5px;
    height: 5vh;
  `;

  const submitInputStyle = css`
    width: 70px;
    height: 40px;
    border-radius: 40px;
    font-weight: 800;
    background-color: lightblue;
    margin-top: 10px;
    box-shadow: 0 2px black;
    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  `;

  const fontsContainerStyle = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5% 0 5% 0;
  `;
  const descriptionArea = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-image: url(laptop-3214756.png);
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.6);
    background-blend-mode: lighten;
    background-size: cover;
    margin: 0;

    #scrollDownPart {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      bottom: 20px;
      text-decoration: none;
      color: black;
    }
  `;

  const descriptionH2Style = css`
    font-weight: 900;
    ${mq[0]} {
      font-size: 20px;
    }
    ${mq[1]} {
      font-size: 40px;
    }
    ${mq[2]} {
      font-size: 50px;
    }
  `;
  const descriptionPStyle = css`
    font-weight: 500;
    ${mq[0]} {
      font-size: 70%;
    }
    ${mq[1]} {
      font-size: 100%;
    }
    ${mq[2]} {
      font-size: 15px;
    }
  `;

  const backToTopStyle = css`
    position: fixed;
    text-decoration: none;
    color: #c61afd;
    ${mq[0]} {
      right: 0;
      bottom: 2%;
    }
    ${mq[1]} {
      right: 3%;
      bottom: 2%;
      font-size: 3em;
    }
  `;
  //////////////////////////////////////////////////////////////////////

  return (
    <div css={containerStyle}>
      <Header />
      <div id="descriptionArea" css={descriptionArea}>
        <h2 css={descriptionH2Style}>
          Try some font-family, font-color and background-color
        </h2>
        <p css={descriptionPStyle}>
          You can change color, background-color, font-size(px), font-weight
        </p>
        <a id="scrollDownPart" href="#inputArea">
          <span>
            <FontAwesomeIcon icon={faCaretDown} size="5x" />
          </span>
          <span>scroll</span>
        </a>
      </div>
      <div id="inputArea" className="inputArea" css={inputAreaStyle}>
        <label css={inputLabelStyle}>
          ここに入力
          <br />↓<br />
          <textarea
            value={inputValue}
            onChange={handleChange}
            css={textInputStyle}
          />
        </label>
        <input
          type="submit"
          onClick={onClickSubmit}
          value="admit"
          css={submitInputStyle}
        />
      </div>
      <div id="fontsContainer" css={fontsContainerStyle}>
        <SansSerif />
        <Serif />
        <MonoSpace />
        <Cursive />
        <Fantasy />
      </div>
      <a href="#top" css={backToTopStyle}>
        <FontAwesomeIcon icon={faCircleUp} />
      </a>
      <Footer />
    </div>
  );
};
