import styled from "styled-components"
import { Body } from "./body/body"

import {useState,useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export default function SingUp() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate()

    function fazerCadastro (event) {
        event.preventDefault(); 

        axios
        .post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", {
            email: email,
            password: senha,
            name: nome,
            cpf: cpf
        })
        .then(() => navigate("/"))
        .catch((err) => alert("tente novamente erro: Verifique se está aplicando valores corretamentente para cada campo. (em 'foto' utilizar uma url. "+err.response.data));
    }

    return (
        <Container onSubmit={fazerCadastro}>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <input
                type="number"
                placeholder="CPF"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
            />
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
            <button type="submit">CADASTRAR</button>
            <Link to={"/"}>
                Já possuí uma conta? Entre
            </Link>
        </Container>
    )
}

const Container = styled.form`
    ${Body}
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 145px;
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