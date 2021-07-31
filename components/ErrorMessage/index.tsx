import styled from 'styled-components'

type Props = {
    message: string,
}
export const ErrorMessage = ({ message }: Props) => {

    return (
        <Wrapper>
            <Message dangerouslySetInnerHTML={{ __html: message }}></Message>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
    width:100%;
`

const Message = styled.p`
    text-align:center;
    font-style: normal;
    font-size: 24px;
    font-weight:bold;
    line-height: 126%;
    letter-spacing: -0.01em;
    color:${({ theme }) => theme.colors.lavenderBlue};
    padding:15px;
    max-width:90%;
`