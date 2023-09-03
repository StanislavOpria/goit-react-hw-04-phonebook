import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  width: 600px;
  padding: 20px;

  border: 1px solid black;
`;

export const Input = styled.input`
  display: block;
  width: 300px;
`;

export const Button = styled.button`
  display: inline;
  width: 100px;
`;
