import styled from "styled-components";

export const LoginFormPanel = styled.form`
  position: absolute;
  width: 50%;
  height: 100%;
  padding: 10px 40px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
  h3 {
    font-size: 20px;
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 20px;
  }

  ${(props) => {
    let css = "";
    switch (props.type) {
      case "SignIn": {
        css += " opacity: 1;";
        css += " z-index: 2;";
        if (props.signIn === false) {
          css += " transform: translateX(100%);";
          css += " opacity: 0;";
          css += " z-index: 1";
        }
        return css;
      }
      default: {
        css += " opacity: 0;";
        css += " z-index: 1;";
        if (props.signIn === false) {
          css += " transform: translateX(100%);";
          css += " opacity: 1;";
          css += " z-index: 5";
        }
        return css;
      }
    }
  }}
`;

export const LoginInputGroup = styled.div`
  position: relative;
  width: 100%;
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    left: 15px;
    color: #847f85;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    background-color: #f4f0f1;
    border: 1px solid #f4f0f1;
    font-weight: 500;
    font-size: 14px;
    padding: 10px 15px 10px 40px;
    border-radius: 20px;
    transition: all 0.5s ease-in;
    ::placeholder {
      color: #847f85;
    }
    :focus {
      border: 1px solid var(--primary-color);
    }
  }
`;

export const LoginButton = styled.input`
  background-color: var(--primary-color);
  color: white;
  font-size: 12px;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 500;
  text-transform: uppercase;
  min-width: 100px;
  transition: 0.5s;
  :active {
    background-color: #df351b;
  }
  :hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
`;

export const LoginText = styled.p`
  font-size: 14px;
  margin-top: 20px;
  span {
    color: var(--primary-color);
    font-weight: bold;
    transition: 0.5s;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const LoginTextValidate = styled.p`
  margin: 5px 0;
  width: 100%;
  padding: 0px 10px;
  text-align: left;
  font-size: 14px;
  color: var(--danger-color);
`;

export const LoginDivide = styled.div`
  width: 100%;
  height: 20px;
`;
