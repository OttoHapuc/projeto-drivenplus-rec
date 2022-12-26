import styled from "styled-components"
import axios from "axios";
import { useState, useContext } from "react"
import UserContext from "../contexts/ValoresBase"
import { Link, useParams, useNavigate } from "react-router-dom";

import { Body } from "./body/body"
export default function Home() {

    const { login, setLogin, planoEscolhido } = useContext(UserContext)
    const navigate = useNavigate();

    function cancelaPlano(){

        const AuthStr = "Bearer ".concat(login.token);
        
        axios
            .delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
                { headers: { Authorization: AuthStr } })
            .then(res => {
                navigate("/subscriptions")
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    }

    if (login.length === 0) {
        return (
            <Grupo>
                <Carregando>Carregando...</Carregando>
            </Grupo>
        )
    }
    return (
        <Grupo>
            <div>
                <img src={login.membership.image} />
            </div>
            <h1>Olá, {login.name}</h1>
            <div>
                <div>
                    {login.membership.perks.map((perk) => <Link to="/" key={perk.title}>
                        <button>{perk.title}</button>
                    </Link>)}
                </div>
                <div>
                    <Link to="/subscriptions" ><button>Mudar plano</button></Link>
                    <Cancelar onClick={cancelaPlano}>Cancelar plano</Cancelar>
                </div>
            </div>
        </Grupo>
    )
}

const Carregando = styled.h1`
    margin-top: 200px;
`
const Grupo = styled.div`
    ${Body}
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 75px;
        height: 50px;
    }
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: white;
        margin:24px 0;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        border:none;
        margin: 4px 0;
        color: white;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
    }
    a{
        color: white;
        text-decoration: none;
    }
    a:link:active, a:visited:active {
        color: white;
}
    > div:nth-child(1n+1){
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }
    > div:nth-child(1n+2){
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 75vh;
    }
`

const Cancelar = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 299px;
height: 52px;
background: #FF4747;
border-radius: 8px;
border: none;
`