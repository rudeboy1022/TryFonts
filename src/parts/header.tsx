import React, { useState, useEffect, memo } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mq } from "../style/style";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export interface IHeader {}

export const Header: React.FunctionComponent<IHeader> = memo((props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    authCheck();
    return () => {
      authCheck();
    };
  }, [auth]);

  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogin(true);
    } else if (!user) {
      setLogin(false);
      console.log("unauthorized");
    }
  });

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const userName = auth.currentUser?.displayName;
  const userPhotoUrl = auth.currentUser?.photoURL;

  let headerRight;

  const loginButton = css`
    background-color: rgba(207, 243, 236, 1);
    margin-right: 5%;
    border: 2px solid black;
    border-radius: 10px;
    padding: 0px 10px;
  `;

  const userPhotoStyle = css`
    border-radius: 50%;
    transform: scale(0.3);
  `;

  const userNameStyle = css`
    font-size: 5px;
    white-space: nowrap;
  `;

  const signoutButtonStyle = css`
    background-color: rgba(207, 243, 236, 1);
    border: none;
  `;

  if (login) {
    headerRight = (
      <>
        <img
          src={userPhotoUrl || "www.default.imageurl"}
          referrerPolicy="no-referrer"
          css={userPhotoStyle}
        />
        <p css={userNameStyle}>welcom {userName}</p>
        <button onClick={handleSignOut} css={signoutButtonStyle}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </>
    );
  } else {
    headerRight = (
      <button onClick={navigateToLogin} css={loginButton}>
        LOGIN
      </button>
    );
  }

  const headerStyle = css`
    width: 100%;
    height: 7vh;
    background-color: rgba(207, 243, 236, 1);
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10000;
  `;

  const LogoStyle = css`
    color: white;
    background-color: black;
    padding: 0 10px;
    border-radius: 10px;
    font-weight: 900;
    margin-left: 5%;
    ${mq[0]} {
      font-size: 100%;
    }
    ${mq[1]} {
      font-size: 20px;
    }
    ${mq[2]} {
      font-size: 25px;
    }
    ${mq[3]} {
      font-size: 35px;
    }
  `;

  const subLogoStyle = css`
    margin-right: 5%;
    ${mq[0]} {
      font-size: 70%;
    }
    ${mq[1]} {
      font-size: 100%;
    }
  `;

  return (
    <header css={headerStyle}>
      <h1 className="logo" css={LogoStyle}>
        Logo
      </h1>
      <h2 css={subLogoStyle}>Try Some Fonts and BackGround</h2>
      {headerRight}
    </header>
  );
});
