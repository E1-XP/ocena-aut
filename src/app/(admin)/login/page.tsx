"use client";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import Icon from "@/components/Icons";
import Input from "@/components/TextField";
import { login as tryLogin } from "@/calls/auth.call";
import { useRedirect } from "@/hooks/useRedirect";
import { validateEmail } from "@/utils/validation";
import { Typography } from "@mui/material";

const Main: FC = () => {
  useRedirect();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleTryLogin = (): void => {
    let error = false;
    if (!validateEmail(login)) {
      setLoginError("Niepoprawny format adresu email");
      error = true;
    } else {
      setLoginError("");
    }
    if (password.length === 0) {
      setPasswordError("Hasło nie może być puste");
      error = true;
    } else {
      setPasswordError("");
    }

    if (!error) {
      tryLogin(login, password).catch(() => {
        setPasswordError("Niepoprawne hasło lub login");
      });
    }
  };

  const handleClearErrors = (): void => {
    setLoginError("");
    setPasswordError("");
  };

  return (
    <CenterWrapper>
      <FormWrapper>
        <Typography variant="h4">Zaloguj się</Typography>
        <Separator />
        <Input
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            handleClearErrors();
          }}
          label={"Login"}
          helperText={loginError}
        />
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleClearErrors();
          }}
          label={"Hasło"}
          type="password"
          helperText={passwordError}
        />
        <Separator />
        <Button
          endIcon={<Icon type="login" />}
          onClick={() => handleTryLogin()}
        >
          Zaloguj
        </Button>
      </FormWrapper>
    </CenterWrapper>
  );
};

export default Main;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75%;
  width: 100%;
`;
const FormWrapper = styled.div`
  min-width: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Separator = styled.div`
  height: 40px;
`;
