import React, { useState } from 'react';
import './add.css';
import firebase from '../../../config/firebase'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';



function Add() {


    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [cep, setCep] = useState();
    const [endComp, setEndComp] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const db = firebase.firestore();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    function addEndereco() {

        db.collection('enderecos').add({
            nome: nome,
            telefone: telefone,
            cep: cep,
            endComp: endComp,
            estado: estado,
            cidade: cidade,
            usuario: usuarioEmail,
        }).then(() => {
            alert('Endereço adicionado com sucesso')
        }).catch(() => {
            alert('erro')
        });

    }

    return (
        <div className="add-content">
            {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to="/login" ></Redirect> : null
            }
            

            <h1 className="text-center text-white pt-4">Adicionar novo endereço</h1>
            <form className=" text-center w-25 mx-auto">
                <div className="form-group">
                    <label className="text-white">Nome completo</label>
                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Telefone</label>
                    <input onChange={(e) => setTelefone(e.target.value)} type="number" className="form-control" ></input>

                    <label className="text-white">CEP</label>
                    <input onChange={(e) => setCep(e.target.value)} placeholder="Ex: 12000100" type="number" maxlength="8" className="form-control" ></input>

                    <label className="text-white">Endereço e número</label>
                    <input onChange={(e) => setEndComp(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Estado</label>
                    <input onChange={(e) => setEstado(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Cidade</label>
                    <input onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" ></input>
                </div>

            </form>
            <div className="container text-center text-white mb-4 ">
                <button onClick={addEndereco} type="button" className="btn btn-lg btn-add-novo-end text-white mt-5">Adicionar novo</button>

            </div>

        </div>
    );
}

export default Add;