import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: Helvetica;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color:${({ theme }) => theme.colors.black};
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }
    strong {
      font-weight: 700;
    }
`



