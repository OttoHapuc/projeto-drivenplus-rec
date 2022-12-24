import styled from "styled-components"
import { useState, useContext } from "react"
import UserContext from "../contexts/ValoresBase"
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";


import { Body } from "./body/body"
import icoBrindes from "../assets/img/Vector.svg"
import icoNota from "../assets/img/Vector2.svg"

export default function Plan() {

    const { login, planoEscolhido } = useContext(UserContext)
    const navigate = useNavigate();

    const [nome, setNome] = useState("")
    const [card, setCard] = useState("")
    const [segurityCode, setSegurityCode] = useState("")
    const [validade, setValidade] = useState("")

    const [finalizaPedido, setFinaliza] = useState(false)

    if (planoEscolhido.length === 0) {
        return (
            <Container>
                <Carregando>Carregando...</Carregando>
            </Container>
        )
    }

    function assinar(event) {
        event.preventDefault()
        setFinaliza(true)
    }

    function concluir() {
        const AuthStr = "Bearer ".concat(login.token);
        
        axios
            .post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
                membershipId: planoEscolhido.id,
                cardName: nome,
                cardNumber: card,
                securityNumber: segurityCode,
                expirationDate: validade[5] + validade[6] + "/" + validade[2] + validade[3]
            },
                { headers: { Authorization: AuthStr } })
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            });

            setFinaliza(false)
            navigate("/home"+planoEscolhido.name.split(" ")[1])

    }
    function cancelarCompra(){
        setFinaliza(false)
    }
    return (
        <Container onSubmit={assinar}>

            {finalizaPedido && <FinalizarPedido>
                <main>
                    <p>
                        Tem certeza que deseja assinar o
                        Plano {planoEscolhido.name}
                        (R$ {planoEscolhido.price.replace(".", ",")})
                    </p>
                    <div>
                        <Nao onClick={cancelarCompra}>Não</Nao>
                        <Sim onClick={concluir}>Sim</Sim>
                    </div>
                </main>
            </FinalizarPedido>}

            <img src={planoEscolhido.image} />
            <h1>{planoEscolhido.name}</h1>
            <ul>
                <div>
                    <img src={icoBrindes} />
                    <span>Brenefícios:</span>
                </div>
                {planoEscolhido.perks.map((perk) => (
                    <li key={perk.title}>
                        <p>{perk.title}</p>
                    </li>
                ))}
            </ul>
            <ul>
                <div>
                    <img src={icoNota} />
                    <span>Preço:</span>
                </div>
                <p>R$ {planoEscolhido.price.replace(".", ",")} cobrados mensalmente</p>
            </ul>

            <Primeiro>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Digitos do cartão"
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    required
                />
            </Primeiro>
            <Segundo>
                <input
                    type="number"
                    placeholder="Código de segurança"
                    value={segurityCode}
                    onChange={(e) => setSegurityCode(e.target.value)}
                    required
                />
                <input
                    type="month"
                    placeholder="Validade 11/26"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    required
                />
            </Segundo>

            <button type="submit">ASSINAR</button>
        </Container>
    )
}

const Carregando = styled.h1`
    margin-top: 200px;
`
const Container = styled.form`
    ${Body}
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 87px;

    color: white;

    img{
        width: 140px;
        height: 95px;
    }

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        margin: 12px 0 22px 0;
    }

    ul{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        margin-bottom: 12px;
        width: 299px;
    }
    ul > li{
        list-style: decimal;
        margin-left: 15px;
    }
    div > span {
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 10px;
    }
    div > img{
        width: 15px;
        height: 15px;
        margin-right:5px;
    }
    ul > div{
        display:flex;
    }
    > button{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        border: none;
        margin-top: 12px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`
const Primeiro = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;

input{
    width: 299px;
    height: 52px;
    border-radius: 8px;
    border:none;
    margin-bottom: 8px;

    padding: 0 14px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
`
const Segundo = styled.div`
display:flex;
input{
    width:145px;
    height: 52px;
    border-radius: 8px;
    border:none;
    margin: 0 4.5px;

    padding: 0 14px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
}
`
const FinalizarPedido = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000007a;
    display: flex;
    align-items: center;
    justify-content: center;

    main {
        width: 248px;
        height: 210px;
        background: #FFFFFF;
        border-radius: 12px;
    }
    main > p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
        margin-top: 33px;
    }
    div{
        display:flex;
        align-items: center;
        justify-content: center;
        margin-top: 47px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`
const Sim = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    border:none;
    margin-left: 14px;
`
const Nao = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 95px;
height: 52px;
background: #CECECE;
border-radius: 8px;
border:none;
`