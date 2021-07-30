import styled from 'styled-components'

type Props = {
    message: string,
}
export const ErrorMessage = ({ message }: Props) => {

    return (
        <Wrapper>
            <Message>{message}</Message>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
    min-height:200px;
    width:100%;
`

const Message = styled.p`
    text-align:center;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 126%;
    letter-spacing: -0.01em;
    color:${({ theme }) => theme.colors.lavenderBlue};
`