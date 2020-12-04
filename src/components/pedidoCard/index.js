import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './pedidoCard.css'
import firebase from '../../config/firebase'


function PedidoCard({ nome, id, descricao, valor, imagem, capacidade, link, quantidade }) {

    const [urlImagem, setUrlImagem] = useState();




    firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then(url => {
        setUrlImagem(url);
    })

    function excluir() {
        firebase.firestore().collection('item-carrinho').doc(id).delete().then(() => {
        }).then(() => {
            alert('Item do carrinho removido com sucesso')
        }).catch(() => {
            alert('Erro')
        })
    }

    return (
        <div className="pedidoCard mb-4 mt-4">
            <hr></hr>
            <div>
                <img className="resize-img-pedido" src={urlImagem} alt="Imagem do smartphone"></img>
                <span>
                    <Link className="link-pedido" to={`/smartphones/p/${link}`}>{nome} | {descricao} | {capacidade}</Link>
                </span>
                <span className=" marginQtd">
                    Qtd: {quantidade}
                </span>
                <span className="ml-5" >
                    <strong>R$ {valor}</strong>
                    <button onClick={excluir}type="button" className="ml-5 text-white button-delete-pedido ">Excluir</button>
                </span>


            </div>
            <hr></hr>
        </div>
    )
}

export default PedidoCard;