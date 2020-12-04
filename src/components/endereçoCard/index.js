import React from 'react'
import { Link } from 'react-router-dom';
import './endereçoCard.css'
import firebase from '../../config/firebase'


function EndereçoCard({ nome, id, telefone, endComp, estado, cidade, cep }) {
    function excluir() {
        firebase.firestore().collection('enderecos').doc(id).delete().then(() => {
        }).then(() => {
            alert('Endereço removido com sucesso')
        }).catch(() => {
            alert('Erro')
        })
    }
    return (
        <div className="ml-3 card ">
            <label > {nome}</label>
            <label>{telefone}</label>
            <label>{endComp}</label>
            <label>{cep}</label>
            <label>{estado}</label>
            <label>{cidade}</label>
            <div className="mt-4">
                <Link to={`/minhaconta/endereços/edit/${id}`}>
                    <button className="btn btn-sm btn-card">Alterar</button>
                </Link>

                <button onClick={excluir} className="btn btn-sm btn-card ml-5 btn-excluir-end">Excluir</button>

            </div>

        </div>
    )
}

export default EndereçoCard;