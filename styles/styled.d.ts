// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            blue: string,
            lavenderBlue: string,
            black: string,
            white: string,
            porcelain: string,
            lightGray: string,
            whiteSmoke: string,
            gray: string,
            ashGray: string,
            gainsboro: string,
        },
        device: {
            xsm: string,
            sm: string,
            md: string,
            lg: string,
            xl: string,
            xxl: string
        }
    }
}