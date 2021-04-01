import React, { memo } from "react";
import FormSign from "./FormSign";

const Login = memo(({ authLogin }) => {
  function handleSubmit(e, { email, password }) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    authLogin(email, password);
  }

  return (
    <FormSign
      name="sign-in"
      title="Вход"
      btnName="Войти"
      onSubmit={handleSubmit}
    />
  );
});

export default Login;
