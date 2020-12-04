import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import EndereçoCard from '../../components/endereçoCard';
import { useSelector} from 'react-redux'
import './endereços.css';
import firebase from '../../config/firebase'


function Endereços() {

  

    const db = firebase.firestore();
    var listaEndereco = [];
    const [endereco, setEndereco] = useState([]);
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    
    useEffect(() => {
        document.body.style.backgroundColor = '#394891' 
        db.collection('enderecos').where('usuario', '==',  usuarioEmail).get().then(async (resultado) => {

            await resultado.docs.forEach(doc => {

                listaEndereco.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setEndereco(listaEndereco);

        })

    },[])
    

    return (
        <div className="conta-content">
             {
                useSelector(state => state.usuarioLogado) === 0 ? <Redirect to="/login" ></Redirect> : null
            }

            

            <h1 className="text-center text-white mb-4 end-title">Endereços</h1>
            <div className="container text-center text-white mb-4 ">


                <div className="form-inline test ">
                    {
                        endereco.map(endereco => < EndereçoCard id={endereco.id} nome={endereco.nome} telefone={endereco.telefone} endComp={endereco.endComp} estado={endereco.estado} cidade={endereco.cidade} cep={endereco.cep} ></EndereçoCard>)
                    }



                </div>





                <Link to="/minhaconta/endereços/add">
                    <button type="button" className="btn btn-lg btn-add-end text-white mt-5">Adicionar novo</button>
                </Link>


            </div>

        </div>
    );
}

export default Endereços;