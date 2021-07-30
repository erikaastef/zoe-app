import styled from "styled-components"

export const Header = () => {
    return (
        <Container>
            <Logo src="/header-logo.svg" alt="Zoe Financial" />
        </Container>
    )
}
const Logo = styled.img`
`
const Container = styled.div`
    background-color:${({ theme }) => theme.colors.lightGray};
    padding:20px 30px 17px;
    width:100%;
    @media(max-width:${({ theme }) => theme.device.sm}){
        background-color:${({ theme }) => theme.colors.porcelain};
        filter:drop-shadow(0px 5px 16px rgba(0, 0, 0, 0.1));
        padding:8px 15px;
    }
`
