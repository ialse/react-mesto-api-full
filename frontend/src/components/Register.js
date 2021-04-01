import React, { memo } from "react";
import FormSign from "./FormSign";

const Register = memo(({ changeCurrUrl, authRegister }) => {
  function handleSubmit(e, { email, password }) {
    e.preventDefault();
    authRegister(email, password);
  }

  return (
    <FormSign
      name="sign-up"
      title="Регистрация"
      btnName="Зарегистрироваться"
      onSubmit={handleSubmit}
      changeCurrUrl={changeCurrUrl}
    />
  );
});

export default Register;
