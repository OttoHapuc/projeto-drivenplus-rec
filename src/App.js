import UserContex from "./contexts/ValoresBase"
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle"

import Login from "./componets/Login"
import SingUp from "./componets/Sing-up"

function App() {

  const [login, setLogin] = useState({});

  return (
    <UserContex.Provider value={{ 
      login, 
      setLogin }}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sing-up" element={<SingUp />} />
          </Routes>
        </BrowserRouter>
    </UserContex.Provider>
  );
}

export default App;
