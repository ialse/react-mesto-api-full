import React, { useState, memo } from 'react';
import FormSign from './FormSign';

const Register = memo(({ changeCurrUrl, authRegister }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Обработчик ввода данных в поля
    function handleChange(e) {
        const { name, value } = e.target;

        //обновляем значение поля после каждого ввода символа
        name === "email" ?
            setEmail(value) :
            setPassword(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        authRegister(email, password);
    }

    return (
        <FormSign
            name="sign-up"
            title="Регистрация"
            btnName="Зарегистрироваться"
            onChange={handleChange}
            onSubmit={handleSubmit}
            changeCurrUrl={changeCurrUrl}
        />
    );
});

export default Register;
