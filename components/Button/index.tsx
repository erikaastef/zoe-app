import React from "react"
import styled, { css } from "styled-components"

type Props = {
    children: React.ReactChild,
    className?: string,
    icon?: string,
    type?: any,
    disabled?: boolean,
    onClick: any,

}
export const Button = ({ children, onClick, disabled, className, icon, type }: Props) => {
    const icons: any = {
        leftArrow: '/icons/left-arrow.svg'
    }
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            icon={icon}
            type={type}
            className={className}
        >
            {children}
            {icon && <Icon src={icons[icon]} alt={icon} />}
        </StyledButton>
    )
}
const Icon = styled.img`
    justify-self:end;
`
const StyledButton = styled.button<{ icon?: string, disabled?: boolean }>`
    display:grid;
    grid-template-columns:${({ icon }) => icon ? '1fr auto' : '1fr'};
    align-items:center;
    justify-content:center;
    gap:15px;
    background-color:${({ theme }) => theme.colors.lavenderBlue};
    color:${({ theme }) => theme.colors.white};
    padding:14px 15px;
    border-radius: 4px;
    width:fit-content;
    cursor:pointer;
    transition: background-color .2s ease-in-out;
    :hover{
        background-color:${({ theme }) => theme.colors.blue};
    }
    ${({ disabled }) => disabled && css`
        background-color:${({ theme }) => theme.colors.gray};
        pointer-events:none;
    `}
    @media(max-width:${({ theme }) => theme.device.sm}){
        width:100%;
    }
`
