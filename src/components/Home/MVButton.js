import React from "react";
import styled from "styled-components";

const ButtonGroup = styled.button`
  padding: 10px 25px;
  border: 1px solid transparent;
  background-color: var(--primary-color);
  color: white;
  border-radius: 30px;
  letter-spacing: 1px;
  transition: 0.5s;
  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
    &:hover {
      background-color: var(--primary-color);
    }
  }
  ${(props) => (props.fullWidth ? "width: 100%;" : "")}
  :hover {
    background-color: var(--dark-color);
  }
  :focus {
    outline: none;
  }
  :active {
    background-color: var(--primary-color);
  }
  svg {
    font-size: 15px;
    margin-left: 5px;
  }
`;
const MVButton = ({ text, onCLick, icon, fullWidth, disabled }) => {
  return (
    <ButtonGroup onClick={onCLick} fullWidth={fullWidth} disabled={disabled}>
      {text}
      {icon}
    </ButtonGroup>
  );
};

export default MVButton;
