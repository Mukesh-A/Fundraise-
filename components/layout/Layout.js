// import React, { Children } from 'react'
import Header from './Header'
import styled,{ThemeProvider, createGlobalStyle} from 'styled-components'
import { useState,createContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children}) => {
  return (
    
    <LayoutWrapper>
      <ToastContainer />
        <GlobalStyle />
            <Header/>
            {children}
    </LayoutWrapper>
      
  )
}

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
`;

const LayoutWrapper = styled.div`

  min-height: 100vh;
  // background-color: #923cb5;
 
  color: #000000;
`;

export default Layout