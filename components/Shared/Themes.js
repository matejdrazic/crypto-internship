import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: '#FFDBE9',
    color: '#333'
}

export const darkTheme = {
    body: '#3b444b',
    color: '#FFF'
}

export const GlobalStyles = createGlobalStyle`

body{
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.color};
}

nav a {
    margin-left: 10px;
    padding: 3px;
    color: ${props => props.theme.color};
  }

`