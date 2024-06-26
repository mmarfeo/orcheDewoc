import styled from "styled-components";

export default styled.main`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
        /* background-color: gray; */
        margin: 0;

background-color: #1f41a9;
/* background-color: #EB8074; */
background-image: url(src/Login/BG.svg);
background-position: center center;
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;

    & > strong {
        position: absolute;
        bottom: 5%;
        color: ${({ theme }) => theme.primaryColor};
        font-size: 200%;
    }

    & > h1 {
        background-color: ${({ theme }) => theme.blueColor};
        color: white;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
        width: 40%;
        font-size: 1.7rem;
    }

    & > form > div > img {
        width: 12rem;
        height: 12rem;
        padding-bottom: 2rem;
    }

    .icono-usuario {
  font-size: 1.4rem; /* Ajusta el tamaño según tus necesidades */
}
    
    & > form {
     /*    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.9); */
     height: 60%;
        width: 30%;
        /* background-color: yellow; */
      /*   border-radius: 15px; */

        @media (max-height: 768px) { height: 60% !important; }
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        
        & > fieldset {
            border: none;
            display: flex;
            flex-direction: column;
            width: 80%;

            margin-bottom: 20px;
            color: #fff;
            
            

            & >  input {
                border: solid 1px rgba(0, 0, 0, 0.4);
                padding: 0.4rem;
                /*                 border-radius: 4px; */
               
                border-radius: 10px;
                border-color: #fff;
                height: 2rem;
                background: none;
                width: -webkit-fill-available;
                color: white;
                padding-left: 1.5rem;
                margin-bottom: 10px;
                /* cursor: text; */
            
            }

            & > label { 
                font-weight: bold;
                padding-left: 10px;
                padding-bottom: 10px;
            }

            & > label > * { 
              /*   font-weight: bold; */
                padding-right: 10px; 
                padding-bottom: 0px;
            }


        
        }

        & > button {
            align-self: center;

            width: 40%;
            padding: 1rem;
            cursor: pointer;
           /* color: ${({ theme }) => theme.accentColor}; */
           color: #fff;
            border-radius: 10px;
            transform: translateY(25%);
            font-weight: bold;
            /*  border: solid 1px ${({ theme }) => theme.accentColor}; */

           border: solid 1px #fff;
            
            transition: 0.5s;
            
            background-color: #1f41a9;

            &:hover {
               /*  background-color: ${({ theme }) => theme.accentColor}; */
               background-color: #fff;
                color: #132c7c;
            }

            & > span {
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
`