import React, { useEffect, useState } from 'react';
import './edit.css';
import firebase from '../../../config/firebase'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';



function EditProduto({ match }) {

    const db = firebase.firestore();
    const [carregando, setCarregando] = useState(0);

    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [capacidade, setCapacidade] = useState();
    const [valor, setValor] = useState();
    const [imagem, setImagem] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    useEffect(() => {

        db.collection('produtos').doc(match.params.id).get().then((resultado) => {

            setNome(resultado.data().nome)
            setDescricao(resultado.data().descricao)
            setCapacidade(resultado.data().capacidade)
            setValor(resultado.data().valor)
            setImagem(resultado.data().imagem)

        })

    }, [carregando])


    function alterarProduto() {
        setCarregando(1);
        firebase.storage().ref(`imagens/${imagem}`).delete();
        firebase.storage().ref(`imagens/${imagem.name}`).put(imagem).then(() => {
            db.collection('produtos').doc(match.params.id).update({
                nome: nome,
                descricao: descricao,
                capacidade: capacidade,
                imagem: imagem.name,
                valor: valor * 1,
            }).then(() => {
                alert('Produto alterado com sucesso')
            }).catch(() => {
                alert('Erro ao alterar produto')
            });
        })




    }

    return (
        <div className="edit-content">

            {
                usuarioEmail !== 'admin@trian.com' ? <Redirect to="/login" ></Redirect> : null
            }
            

            <h1 className="text-center text-white pt-4">Editar produto</h1>
            <form className=" text-center w-25 mx-auto">
                <div className="form-group">
                    <label className="text-white">Nome</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Descrição</label>
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} type="text" className="form-control" rows='2'></textarea>


                    <label className="text-white">Capacidade</label>
                    <input value={capacidade} onChange={(e) => setCapacidade(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Valor</label>
                    <input value={valor} onChange={(e) => setValor(e.target.value)} type="number" className="form-control" ></input>

                    <label className="text-white">Imagem</label>
                    <input onChange={(e) => setImagem(e.target.files[0])} type="file" className="text-white"></input>
                </div>

            </form>
            <div className="container text-center text-white mb-4 ">
                <button onClick={alterarProduto} type="button" className="btn btn-lg btn-add btn-add mt-5">Editar</button>

            </div>

        </div>
    );
}

export default EditProduto;