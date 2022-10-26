import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface ILoginPageProps {}

export const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const loginPageContainer = css`
    width: 100vw;
    height: 100vh;
    background-color: #c3faf3;
    margin-top: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const loginPartAreaStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  `;

  const mainTextStyle = css`
    margin: 0;
    font-family: "Comic Sans MS";
  `;

  const buttonStyle = css`
    padding: 0;
    margin: 0;
    border: none;
  `;

  const buttonImageStyle = css`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    border-radius: 5px;
  `;
  return (
    <div className="loginPageContainer" css={loginPageContainer}>
      <div className="loginPartArea" css={loginPartAreaStyle}>
        <p className="mainText" css={mainTextStyle}>
          LOGIN WITH GOOGLE
        </p>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          disabled={authing}
          css={buttonStyle}
        >
          <img
            src={`${window.location.origin}/btn_google_signin_light_normal_web.png`}
            css={buttonImageStyle}
          />
        </button>
      </div>
    </div>
  );
};
