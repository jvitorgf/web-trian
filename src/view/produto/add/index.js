import React, { useState } from 'react';
import './add.css';
import firebase from '../../../config/firebase'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';



function AddProduto() {


    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [capacidade, setCapacidade] = useState();
    const [valor, setValor] = useState();
    const [imagem, setImagem] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const db = firebase.firestore();

    function add() {
        firebase.storage().ref(`imagens/${imagem.name}`).put(imagem).then(() => {
            db.collection('produtos').add({
                nome: nome,
                descricao: descricao,
                capacidade: capacidade,
                imagem: imagem.name,
                valor: valor * 1,
            }).then(() => {
                alert('Produto adicionado com sucesso')
            }).catch(() => {
                alert('Erro ao adicionar o produto')
            });
        })
    }

    return (
        <div className="add-content">

            {
                usuarioEmail !== 'admin@trian.com' ? <Redirect to="/login" ></Redirect> : null
            }
            

            <h1 className="text-center text-white pt-4">Adicionar novo produto</h1>
            <form className=" text-center w-25 mx-auto">
                <div className="form-group">
                    <label className="text-white">Nome</label>
                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Descrição</label>
                    <textarea onChange={(e) => setDescricao(e.target.value)} type="text" className="form-control" rows='2'></textarea>


                    <label className="text-white">Capacidade</label>
                    <input onChange={(e) => setCapacidade(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Valor</label>
                    <input onChange={(e) => setValor(e.target.value)} type="number" className="form-control" ></input>

                    <label className="text-white">Imagem</label>
                    <input onChange={(e) => setImagem(e.target.files[0])} type="file" className="text-white"></input>
                </div>

            </form>
            <div className="container text-center text-white mb-4 ">
                <button onClick={add} type="button" className="btn btn-lg btn-add btn-add mt-5">Adicionar</button>

            </div>

        </div>
    );
}

export default AddProduto;