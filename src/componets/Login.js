import { useState, useContext } from "react";
import styled from "styled-components"
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/ValoresBase";

import soon from "../assets/img/Log.svg"
import { Body } from "../componets/body/body";
export default function Login() {

    const { setLogin, setPlans } = useContext(UserContext)

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    let login = null;

    function fazerLogin(event) {
        event.preventDefault();

        axios
            .post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", {
                email: email,
                password: senha
            })
            .then((err) => { 
                setLogin(err.data); 
                (err.data.membership !== null) ? navigate("/home/"+err.data.membership.name.split(" ")[1]) : setTimeout(subscriber, 2000)
            })
            .catch((err) => alert(err.response.data.message));
    }

    function subscriber() {
        navigate("/subscriptions")
    }

    return (
        <Container onSubmit={fazerLogin}>
            <img src={soon} />
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
            />
            <button type="submit">ENTRAR</button>
            <Link to={"/sing-up"}>
                Não tem uma conta? Cadastre-se!
            </Link>
        </Container>
    )
}

const Container = styled.form`
    ${Body}
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 299px;
        height: 49px;
        margin: 100px 0;
    }
    input{
        width: 299px;
        height: 52px;
        margin: 8px;
        border-radius: 8px;
        border: none;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        padding: 0 14px;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 298px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        border: none;
        margin: 18px 0 24px 0;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color:white;
    }
    a{
        color: white;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
    }
    a:visited{
        color: white;
    }
`