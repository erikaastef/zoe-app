import React from 'react'
import styled from 'styled-components'
import { currencyFormat } from '../../utils'

type Props = {
    agent: {
        "id": number,
        "name": string,
        "avatar": string,
        "income": number
    },
    onClick: any
}

export const Card = ({ agent, onClick }: Props) => {
    return (
        <Box onClick={onClick}>
            <Avatar src={agent.avatar} alt="avatar" />
            <Info>
                <h3>{agent.name}</h3>
                <h5>ID: {agent.id}</h5>
                <h5 className="gray-bg"><span />Income <strong>{currencyFormat(agent.income)}</strong></h5>
            </Info>
        </Box>
    )
}
const Box = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
    cursor:pointer;
    padding:30px;
    background-color:${({ theme }) => theme.colors.white};
    box-shadow: 0px 8px 16px rgba(29, 35, 58, 0.1);
    border-radius: 12px;
    z-index: 1;
    .gray-bg{
        padding-top:20px;
        span{
            background-color:${({ theme }) => theme.colors.whiteSmoke};
            position: absolute;
            z-index: -1;
            top: 0px;
            left: -30px;
            bottom: -30px;
            right: -30px;
        }
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        padding:16px;
        flex-direction:row;
        .gray-bg{
            padding:0px;
            span{
                display:none;
            }

        } 
    }
`
const Avatar = styled.img`
    width: 112px;
    height: 112px;
    @media(max-width:${({ theme }) => theme.device.sm}){
        width: 78px;
        height: 78px;
    }
`
const Info = styled.div`
    display:flex;
    flex-direction:column;
    gap:16px;
    width:100%;
    color:${({ theme }) => theme.colors.ashGray};
    h3{
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }
    h5{
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
    }
    @media(max-width:${({ theme }) => theme.device.sm}){
        h3, h5{
            text-align:left;
        }
    }

`
