import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../customHook/useForm";

const FormSign = memo(
  ({ name, title, onSubmit, isLoading, btnName, changeCurrUrl }) => {
    const form = useForm();

    return (
      <form
        className="form"
        name={`form_${name}`}
        noValidate
        onSubmit={(e) =>
          onSubmit(e, {
            email: form.values.email,
            password: form.values.password,
          })
        }
      >
        <h2 className="form__title">{title}</h2>
        <label className="form__field">
          <input
            type="email"
            className="form__input"
            id={`form-email-${name}`}
            name="email"
            placeholder="Email"
            minLength="1"
            maxLength="30"
            required
            onChange={form.handleChange}
          />
        </label>
        <span className="form__error">{`${
          form.errors.email ? form.errors.email : ""
        }`}</span>
        <label className="form__field">
          <input
            type="password"
            className="form__input"
            id={`form-password-${name}`}
            name="password"
            placeholder="Пароль"
            minLength="8"
            required
            onChange={form.handleChange}
          />
        </label>
        <span className="form__error">{`${
          form.errors.password ? form.errors.password : ""
        }`}</span>
        <button
          type="submit"
          className={`form__btn ${!form.isValid ? "form__btn_disabled" : ""}`}
          disabled={!form.isValid}
        >
          {isLoading ? <div className="spinner"></div> : btnName}
        </button>
        {name === "sign-up" && (
          <p className="form__text">
            Уже зарегистрированы?{" "}
            <Link
              to="/sign-in"
              onClick={() => changeCurrUrl("/sign-in")}
              className="form__link"
            >
              Войти
            </Link>
          </p>
        )}
      </form>
    );
  }
);

export default FormSign;
