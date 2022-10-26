import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/login";
import { initializeApp } from "firebase/app";
import { Config } from "./firebaseConfig/config";

const firebaseInit = initializeApp(Config.firebaseConfig);

export interface IApplicationProps {}

export const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
