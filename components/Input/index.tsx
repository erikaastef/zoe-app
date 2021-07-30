import React from 'react'
import styled from "styled-components"
import { motion } from 'framer-motion'

type Props = {
    className?: string,
    label?: string,
    name?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: any,
    placeholder?: string,
    type: string,
    value?: string,
    icon?: string,
    instructions?: string,
    showInstructions?: boolean,
}

export const Input = ({ label, type, onChange, onKeyDown, instructions, showInstructions, value, placeholder, icon }: Props) => {
    const icons: any = {
        dollar: '/icons/dollar-icon.svg'
    }
    return (
        <Label>
            {label}
            <Wrapper>
                {icon && <Icon src={icons[icon]} alt="icon" />}
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </Wrapper>

            {
                instructions ?
                    <motion.small
                        animate={{ opacity: showInstructions ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {instructions}
                    </motion.small>
                    : ''
            }
        </Label>
    )
}

const Label = styled.label`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.ashGray};
    small{
        opacity:0;
        font-size: 12px;
        line-height: 24px;
        color: ${({ theme }) => theme.colors.lavenderBlue};
    }
`
const Icon = styled.img`
    width:10px;
    margin-right:10px;
`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gainsboro};
    padding:14px;
    border-radius: 4px;
    margin-top:9px;
`
const StyledInput = styled.input`
    width: 100%;
    color: ${({ theme }) => theme.colors.ashGray};
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type=number]{
        -moz-appearance: textfield;
    }
`