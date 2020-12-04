import React, { useEffect, useState } from 'react';
import './edit.css';
import firebase from '../../../config/firebase'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';



function Edit({ match }) {
    
    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [cep, setCep] = useState();
    const [endComp, setEndComp] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const db = firebase.firestore();
    const [carregando, setCarregando] = useState(0);


    useEffect(() => {

        db.collection('enderecos').doc(match.params.id).get().then ((resultado) => {

            setNome(resultado.data().nome)
            setTelefone(resultado.data().telefone)
            setCep(resultado.data().cep)
            setEndComp(resultado.data().endComp)
            setEstado(resultado.data().estado)
            setCidade(resultado.data().cidade)

        })

    },[carregando])


    function alterarEndereco() {
        setCarregando(1);
        db.collection('enderecos').doc(match.params.id).update({
            nome: nome,
            telefone: telefone,
            cep: cep,
            endComp: endComp,
            estado: estado,
            cidade: cidade,
        }).then(() => {
            alert('Endereço alterado com sucesso')
        }).catch(() => {
            alert('erro')
        });




    }

    return (
        <div className="edit-content">
             {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to="/login" ></Redirect> : null
            }
            

            <h1 className="text-center text-white pt-4">Alterar endereço</h1>
            <form className=" text-center w-25 mx-auto">
                <div className="form-group">
                    <label className="text-white">Nome completo</label>
                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" value={nome} ></input>

                    <label className="text-white">Telefone</label>
                    <input value={telefone} onChange={(e) => setTelefone(e.target.value)} type="number" className="form-control" ></input>

                    <label className="text-white">CEP</label>
                    <input value={cep} onChange={(e) => setCep(e.target.value)} type="number" maxlength="8" className="form-control" ></input>

                    <label className="text-white">Endereço e número</label>
                    <input value={endComp} onChange={(e) => setEndComp(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Estado</label>
                    <input value={estado} onChange={(e) => setEstado(e.target.value)} type="text" className="form-control" ></input>

                    <label className="text-white">Cidade</label>
                    <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" ></input>
                </div>

            </form>
            <div className="container text-center text-white mb-4 ">
                <button onClick={alterarEndereco} type="button" className="btn btn-lg btn-add  mt-5">Alterar</button>

            </div>

        </div>
    );
}

export default Edit;