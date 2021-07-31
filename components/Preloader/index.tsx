import React from 'react'
import styled, { keyframes } from 'styled-components'

type Props = {
    maxWidth?: number,
    height?: number,
    className?: string,
    inline?: boolean
}

export const Preloader = ({ maxWidth, height, className, inline }: Props) => {
    return (
        <ProgressBarWrapper className={className} maxWidth={maxWidth} height={height} inline={inline}>
            <ProgressBar />
        </ProgressBarWrapper>
    );
}
const ProgressBarWrapper = styled.article<{
    maxWidth?: number,
    height?: number,
    inline?: boolean
}>`
    overflow: hidden;
    width: 100%;
    max-width: ${({ maxWidth }) => maxWidth && maxWidth > 0 ? maxWidth + 'px' : '100%'};
    height: ${({ height }) => height && height > 0 ? height + 'px' : '4px'};
    background-color: rgba(255,255,255,0.5);
    display: ${({ inline }) => inline ? 'inline-block' : 'block'};
    margin: ${({ inline }) => inline ? '0' : '20px auto'};
`

const ProgressAnimationSmall = keyframes`
    0% { left: -100%; width: 100%; }
    100% { left: 100%; width: 10%; }
`
const ProgressAnimationLarge = keyframes`
    0% { left: -150%; width: 100%; }
    100% { left: 100%; width: 10%; }
`

const ProgressBar = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    &:before {
        content: '';
        position: absolute;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.lavenderBlue};
        animation: ${ProgressAnimationSmall} 1.5s infinite ease-out;
    }
    &:after {
        content: '';
        position: absolute;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.lavenderBlue};
        animation: ${ProgressAnimationLarge} 1.5s infinite ease-in;
    }
`
