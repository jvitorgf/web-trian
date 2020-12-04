import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import './login.css';

import firebase from '../../config/firebase.js'
import 'firebase/auth'


function Login() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const mudarVisibilidade = () => {
        setMostrarSenha(mostrarSenha ? false : true);
    };


    function autenticar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            alert('Logado com sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOGIN', usuarioEmail: email });
            }, 2000);


        })
            .catch(erro => {
                alert('Erro ao realizar o login')
            })

    }

    return (
        <div className="login-content">
            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/" ></Redirect> : null
            }



            <h1 className="text-center text-white mb-4">Login</h1>
            <form className="text-white text-center w-25 mx-auto">
                <div className="form-group">
                    <label for="inputUsuario" >Usuário</label>
                    <input onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu nome de usuário" type="text" className="form-control" id="inputUsuario"></input>

                </div>
                <div className="form-group">
                    <label for="inputSenha">Senha</label>
                    <input onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha" type={mostrarSenha ? "text" : "password"} className="form-control" id="inputSenha"></input>
                    <span onClick={mudarVisibilidade} className="icon-eye fas fa-eye"></span>
                </div>
                <button onClick={autenticar} type="button" className="btn btn-lg btn-login  mt-5">Entrar</button>
            </form>
            <div className="link-teste">
                <Link to="/lostpassword" className="mx-2 text-white">Recuperar senha</Link>

                <Link to='/newuser' className="mx-2 text-white">Cadastrar</Link>
            </div>
        </div>
    );
}

export default Login;