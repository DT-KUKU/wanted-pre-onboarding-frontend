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
function SignUp() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const { pathname: url } = useLocation();
  useToken(url);
  const navigate = useNavigate();
  const SignUpHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/auth/signup`, {
        email: userEmail,
        password: userPassword,
      })
      .then(() => navigate("/signin"))
      .catch((err) => {
        throw Error(err);
      });
  };

  useEffect(() => {
    if (emailChecker(userEmail) && passwordChecker(userPassword)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [userEmail, userPassword]);

  return (
    <Container>
      <div>
        <h1>Join</h1>
      </div>
      <FormContainer onSubmit={SignUpHandler}>
        <FormWrapper>
          <InputContainer
            placeholder="Please enter your email"
            type="email"
            data-testid="email-input"
            onChange={(e) => {
              setUserEmail(e.currentTarget.value);
            }}
          />
          <InputContainer
            placeholder="Please enter your password"
            type="password"
            data-testid="password-input"
            onChange={(e) => {
              setUserPassword(e.currentTarget.value);
            }}
          />
          <SignButton
            disabled={disable}
            type="submit"
            data-testid="signup-button"
          >
            회원가입
          </SignButton>
        </FormWrapper>
      </FormContainer>
    </Container>
  );
}

export default SignUp;
