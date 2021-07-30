import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
    children: React.ReactChild,
    className?: string,
    onClick?: any,
    href?: string | '',
    disabled?: boolean

}
export const Anchor = ({ children, className, onClick, href, disabled }: Props) => {
    return (
        <StyledAnchor
            className={className}
            onClick={onClick}
            href={href}
            disabled={disabled}
        >
            {children}
        </StyledAnchor>
    )
}
const StyledAnchor = styled.a<{ disabled?: boolean }>`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color:${({ theme }) => theme.colors.lavenderBlue};
    cursor:pointer;
    transition: color .2s ease-in-out;
    :hover{
        color:${({ theme }) => theme.colors.blue};
    }
    ${({ disabled }) => disabled && css`
        color:${({ theme }) => theme.colors.gray};
        pointer-events:none;
    `}
`
