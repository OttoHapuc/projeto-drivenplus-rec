import UserContex from "./contexts/ValoresBase"
import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle"

import Login from "./componets/Login"
import SingUp from "./componets/Sing-up"
import Subscriptions from "./componets/Subscriptions"
import Plan from "./componets/Plan"

function App() {

  const [login, setLogin] = useState({});
  const [plans, setPlans] = useState([])
  const [planoEscolhido, setPlanoEscolhido] = useState([])

  return (
    <UserContex.Provider value={{
      login,
      setLogin,
      plans,
      setPlans,
      planoEscolhido,
      setPlanoEscolhido
    }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/:id" element={<Plan />} />
          <Route path="/home:tipoDeInscricao" element={"/*<Home />*/"} />
        </Routes>
      </BrowserRouter>
    </UserContex.Provider>
  );
}

export default App;
