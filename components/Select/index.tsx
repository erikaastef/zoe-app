import React, { useState } from 'react'
import styled, { css } from "styled-components"
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
    className?: string,
    label?: string,
    name?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    value?: string,
    options: Array<any>,
}

export const Select = ({ label, className, onChange, options, value, placeholder = 'Select...' }: Props) => {
    const [displayOptions, setDisplayOptions] = useState(false)
    const handleOptionsDisplay = () => {
        setDisplayOptions((prev) => !prev)
    }
    return (
        <div className={className}>
            <Label>
                {label}
                <Wrapper
                    onClick={handleOptionsDisplay}
                >
                    <CustomInput>{value ? value : placeholder}</CustomInput>
                    <Icon
                        displayOptions={displayOptions}
                        animate={{ rotate: displayOptions ? -180 : 0 }}
                        transition={{ duration: 0.7 }}
                        viewBox="0 0 12 7"
                    >
                        <path d="M1.415 0L6 4.328 10.585 0 12 1.336 6 7 0 1.336 1.415 0z" fill="#8b8b8b" />
                    </Icon>
                </Wrapper>
            </Label>
            <AnimatePresence>
                {
                    displayOptions ?
                        <Menu
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {
                                options.length ?
                                    options.map((option) => (
                                        <Option
                                            key={option.value}
                                            active={value === option.label}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onChange(option)
                                                setDisplayOptions(false)
                                            }}
                                        >
                                            {option.label}
                                        </Option>
                                    ))
                                    : '...loading'
                            }
                        </Menu>
                        : ''
                }
            </AnimatePresence>
        </div>
    )
}

const Label = styled.label`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.ashGray};
    small{
        font-size: 12px;
        line-height: 40px;
        color: ${({ theme }) => theme.colors.lavenderBlue};
    }
`
const Icon = styled(motion.svg) <{ displayOptions?: boolean }>`
    width: 12px;
    right: 8px;   
    margin-left:10px;
    * {
        transition: fill .2s ease-in-out;
    }
    ${({ displayOptions }) => displayOptions && css`
        path{
            fill:${({ theme }) => theme.colors.lavenderBlue};
        }
    `}
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
const CustomInput = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.ashGray};
`
const Menu = styled(motion.div)`
    position:absolute;
    top: 69px;
    background-color:${({ theme }) => theme.colors.white};
    min-height:200px;
    width:100%;
    border: 1px solid ${({ theme }) => theme.colors.gainsboro};
    z-index:4;
`
const Option = styled.div<{ active?: boolean }>`
    padding:14px;
    width:100%;
    transition: color .2s ease-in-out;
    cursor:default;
    color: ${({ theme }) => theme.colors.ashGray};
    ${({ active }) => active ? css`
        color:${({ theme }) => theme.colors.blue};
        :hover{
            opacity:1;
            color:${({ theme }) => theme.colors.blue};
        }
    `: css`
       :hover{
            opacity:0.8;
            color:${({ theme }) => theme.colors.lavenderBlue};
        }
    `}
`