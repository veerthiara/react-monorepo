import React from 'react';
import styled from 'styled-components';

const BlueButton = styled.button`
  background-color: blue;
`;
const Button = ({ children, ...props }) => {
const propsGetting = {...props}
console.log({props: {...props}});
return <BlueButton>{children}</BlueButton>
};

export default Button;