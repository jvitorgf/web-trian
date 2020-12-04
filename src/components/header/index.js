import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import './header.css'

import firebase from '../../config/firebase.js'
import 'firebase/auth'


function Header() {
    const dispatch = useDispatch();
    var qtd = 0;
    const [qtdTotal, setQtdTotal] = useState(0);
    const db = firebase.firestore();
    var listaPedido = [];
    const [pedido, setPedido] = useState([]);
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    useEffect(() => {
        if (usuarioEmail !== null) {
            db.collection('item-carrinho').where('usuario', '==',  usuarioEmail ).get().then(async (resultado) => {

                await resultado.docs.forEach(doc => {

                    listaPedido.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setPedido(listaPedido);

            }, [])
        } else {
            db.collection('item-carrinho').where('usuario', '==', null).get().then(async (resultado) => {

                await resultado.docs.forEach(doc => {

                    listaPedido.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setPedido(listaPedido);

            }, [])

        }


        for (var i = 0; i < pedido.length; i++) {
            qtd = pedido[i].quantidade + qtd
            if (i === (pedido.length - 1)) {
                setQtdTotal(qtd)
            }

        }
    })


    function sair() {
        firebase.auth().signOut().then(resultado => {
            alert('Logout realizado com sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOGOUT', usuarioEmail: null });
            }, 300);
        }).catch(erro => {
            alert('Erro ao fazer o logout');
        })
    }

    return (
        <div className="header">
            <div className="header-ctg">
                <Link className="header-links" to="/smartphones">Smartphones</Link>
                <Link className="header-links" to="#">Notebooks</Link>
                <Link className="header-links" to="#">Tablets</Link>
                <Link id="sale" to="#">Sale</Link>
                <Link className="searchbar" to="/"><img src={require('./logo.png')} alt="Logo da página" ></img></Link>

                <input className="searchbar" type="text" placeholder="Search.." size="15"></input>
                <button className="ml-3 button-search" type="submit"><i className="fas fa-search"></i></button>
                {
                    useSelector(state => state.usuarioLogado) > 0 ?
                        <Link className="header-links" id="account" to="/minhaconta">Account</Link>
                        :
                        <Link className="header-links" id="account" to="/login">Account</Link>
                }

                <Link to="/carrinho"><img className="ml-2" id="cart" src={require('./shopping-cart.svg')} alt="Carrinho"></img></Link>
                <span className="ml-1">{qtdTotal}</span>

                {
                    useSelector(state => state.usuarioLogado) > 0 ?
                        <button onClick={sair} className="exit ml-1" type="submit"><i className=" fas  fa-sign-out-alt"></i></button>
                        :
                        <>
                        </>
                }

            </div>

        </div>
    )
}

export default Header;
