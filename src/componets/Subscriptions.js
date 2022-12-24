import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "../contexts/ValoresBase";

import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Body } from "./body/body";

export default function Subscriptions() {

    const navigate = useNavigate();

    const { login, setLogin, plans, setPlans, setPlanoEscolhido } = useContext(UserContext)

    if (plans.length === 0) {
        return (
            <Grupo>
                <Carregando>Carregando...</Carregando>
            </Grupo>
        )
    }

    function selecionaPlano(a, b) {

        const AuthStr = "Bearer ".concat(login.token);

        axios
            .get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${a.id}`,
                { headers: { Authorization: AuthStr } })
            .then(res => {
                setPlanoEscolhido(res.data)
            })
            .catch((error) => {
                console.log(error)
            });

            navigate(`/subscriptions/${a.id}`)

    }

    return (
        <Grupo>
            <h1>Escolha seu Plano</h1>
            {plans.map((plain) => (
                <Planos key={plain.image} onClick={(e) => selecionaPlano(plain, e)}>
                    <img src={plain.image} />
                    <span>R$ {plain.price.replace(".", ",")}</span>
                </Planos>
            ))}
        </Grupo>
    )
}

const Grupo = styled.div`
    ${Body}
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: white;
        margin:24px 0;
    }
`
const Carregando = styled.h1`
    margin-top: 200px;
`
const Planos = styled.div`
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin: 5px 0;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    img{
        width: 139px;
        height: 95px;
    }
    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`