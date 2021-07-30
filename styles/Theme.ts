// my-theme.ts
import { DefaultTheme } from 'styled-components';

const myTheme: DefaultTheme = {
    colors: {
        blue: '#2945ab',
        lavenderBlue: '#5C7BEB',
        black: '#3F3E3A',
        white: '#FFFFFF',
        porcelain: '#FCFCFC',
        whiteSmoke: '#F5F5F5',
        lightGray: '#FAFAFA',
        gray: '#B4B4B4',
        ashGray: '#5F5F5F',
        gainsboro: '#DCDCDC',
    },
    device: {
        xsm: '450px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1440px'
    }
};

export { myTheme };