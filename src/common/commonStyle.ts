import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const FormContainer = styled.form`
  border: 1px solid black;
  width: 320px;
  height: 320px;
  border-radius: 10px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const InputContainer = styled.input`
  margin: 10px 0px;
  width: 200px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 0px 10px;
`;

export const SignButton = styled.button`
  border: 1px solid gray;
  border-radius: 5px;
  background-color: transparent;
  width: 80px;
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
`;
