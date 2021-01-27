import React, { useState, memo } from 'react';
import FormSign from './FormSign';

const Login = memo(({ authLogin }) => {

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
        console.log('handleSubmit');
        console.log(email, password);

        if (!email || !password) {
            return;
        }

        authLogin(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
            })
            .catch(err => console.log(err));
    }

    return (
        <FormSign
            name="sign-in"
            title="Вход"
            btnName="Войти"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
});

export default Login;
