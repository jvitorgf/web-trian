import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './minhaconta.css';






function MinhaConta() {


    return (
        <div className="conta-content">
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to="/login" ></Redirect> : null
            }


            {useSelector(state => state.usuarioEmail === 'admin@trian.com') ?
                <>
                    <h1 className="text-center text-white mb-4">Administrador</h1>
                    <div className="container text-center text-white mb-4 ">

                        <Link to="/minhaconta/produtos/add">
                            <button type="button" className="btn btn-lg btn-adm  mt-5">
                                Adicionar produto
                           </button>
                        </Link>

                    </div>
                </> :
                <>
                    <h1 className="text-center text-white mb-4">Minha Conta</h1>
                    <div className="container text-center text-white mb-4 ">

                        <Link to="/minhaconta/endereços">
                            <button type="button" className="btn btn-lg btn-end text-white mt-5">
                                Endereços
                </button>
                        </Link>

                    </div>
                </>

            }



        </div>
    );
}

export default MinhaConta;