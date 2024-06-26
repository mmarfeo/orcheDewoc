import { Modal } from "@mui/material";
import styled from "styled-components";

export const ActionButton = styled.button`
    background-color: transparent;
    border: 0px;
    /* border: solid 1px black; */
    /* border-radius: 5px; */
   /*  padding: 0.3rem; */
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        /* hover buttons dentro de la tabla */
        border-color: transparent;
        background-color: #1f41a9;
        color: white;
    }
`;

export const MainDashboardView = styled.main`
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: Fantasy;
`

export const ContentSection = styled.section` 
    flex: 8; 
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    box-sizing: border-box;
    align-items: flex-start;

    overflow: hidden;
`

export const HeaderSection = styled.section`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    & > h1 {
        box-sizing: border-box;
        text-align: center;
        font-size: 1.7rem;
        font-weight: normal;
    }

`

export const FooterSection = styled.section`
    flex: 1;
    display: flex;
    justify-content: end;
    align-items: start;
    box-sizing: border-box;
`

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    margin-right: 5%;
    padding: 1%;
    border-radius: 10px;
    


    cursor: pointer;

    background-color: ${props => props.theme.blueColor};
    color: white;

    
    border: solid 2px ${props => props.theme.blueColor};
   /*  color: ${props => props.theme.blueColor}; */
    transition: 0.3s;
    transform: translateY(-50%);
    
    & > h3 { 
        margin-right: 10px;
        font-size: 1.2rem;
        padding-top: 0.3rem;
    }
    &:hover {
       /*  background-color: ${props => props.theme.blueColor};
        color: white; */

        background-color: rgba(0, 0, 0, 0.05);
        color: ${props => props.theme.blueColor};
    }
`;

export const StyledSubTitle = styled.h2`
    font-weight: 500;
    font-size: 1.3rem;
`;

export const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;

    & > section {
        background-color: white;
        width: 30%;
        border-radius: 10px;

        outline: none;
        padding: 10px;

        & > form {
           display: flex;
           flex-direction: column;
           padding: 10px;
           justify-content: space-between;

            & > div.formButtonContainer {
                width: 60%;
                align-self: center;
                padding-top: 20px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            }
        }
    }
`

export const StyledButton = styled.button`
    color: ${props => props.theme.blueColor};
    background-color: white;
    border: solid 1px ${props => props.theme.blueColor};
    padding: 5px;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 5px;
    text-transform: uppercase;

    &:hover {
        background-color: ${props => props.theme.blueColor};
        color: white;
    }
`;

export const HeaderWithSearch = styled(HeaderSection)`
    display: flex;
    position: relative;

    & > form {
        position: absolute;
        right: 10%;
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 20px;
    }
`;