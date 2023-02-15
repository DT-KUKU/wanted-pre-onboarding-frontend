import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  FormContainer,
  FormWrapper,
  InputContainer,
  SignButton,
} from "../common/commonStyle";
import { emailChecker, passwordChecker } from "../common/util";
import useToken from "../hooks/useToken";

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const { pathname: url } = useLocation();
  useToken(url);
  const navigate = useNavigate();
  const LoginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/auth/signin`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.access_token);
        navigate("/todo");
      })
      .catch((err) => {
        throw Error(err);
      });
  };

  useEffect(() => {
    if (emailChecker(email) && passwordChecker(password)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  return (
    <Container>
      <div>
        <h1>Login</h1>
      </div>
      <FormContainer onSubmit={LoginHandler}>
        <FormWrapper>
          <InputContainer
            placeholder="UserEmail"
            type="email"
            data-testid="email-input"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
          <InputContainer
            placeholder="Password"
            type="password"
            data-testid="password-input"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <SignButton
            disabled={disable}
            type="submit"
            data-testid="signin-button"
          >
            로그인
          </SignButton>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
}

export default SignIn;
