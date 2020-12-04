import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './produtoCard.css'
import firebase from '../../config/firebase'
import { useSelector } from 'react-redux';


function ProdutoCard({ nome, id, descricao, valor, imagem, capacidade }) {

    const [urlImagem, setUrlImagem] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);




    useEffect(() => {
        firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then(url => {
            setUrlImagem(url);
        })


    }, [imagem])


    function excluir() {
        if (window.confirm("Deseja confirmar a remoção ?")) {
            firebase.firestore().collection('produtos').doc(id).delete().then(() => {
            }).then(() => {
                alert('Produto removido com sucesso');
            }).catch(() => {
                alert('Erro ao excluir');
            })
        } else {
            alert('Produto não removido');
        }
    }


    return (


        <div className="col-sm-4 ctg-grid mb-5 mt-5">
            <Link to={`/smartphones/p/${id}`}>
                <img src={urlImagem} className="resize" alt="Imagem do smartphone"></img>
            </Link>
            <div className="nome-prod"><strong>{nome}</strong></div>
            <div className="prod-esp">{capacidade}</div>
            {usuarioEmail === 'admin@trian.com' ?
                <>
                    <Link to={`/smartphones/editar/${id}`}>
                        <button className="margin-buttons btn-editar">Editar</button>
                    </Link>
                    <button onClick={excluir} className="ml-5 btn-excluir">Excluir</button>
                </>
                : null

            }
        </div>


    )
}

export default ProdutoCard;