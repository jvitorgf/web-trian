import React, { useEffect, useState } from 'react'
import './produto.css'
import firebase from '../../config/firebase'
import Header from '../../components/header/index';
import Footer from '../../components/footer/footer';
import { useSelector } from 'react-redux';


function Produto({ match }) {

    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [capacidade, setCapacidade] = useState();
    const [valor, setValor] = useState();
    const [imagem, setImagem] = useState();
    const [urlImagem, setUrlImagem] = useState();
    const [quantidade, setQuantidade] = useState();
    const db = firebase.firestore();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    


    useEffect(() => {


        db.collection('produtos').doc(match.params.id).get().then((resultado) => {

            setNome(resultado.data().nome)
            setDescricao(resultado.data().descricao)
            setCapacidade(resultado.data().capacidade)
            setValor(resultado.data().valor)
            setImagem(resultado.data().imagem)

        })
    },[])


    firebase.storage().ref(`imagens/${imagem}`).getDownloadURL().then(url => {
        setUrlImagem(url);
    })


    function adicionarCarrinho() {
        if (quantidade > 0 && quantidade < 50) {
            db.collection('item-carrinho').add({
                nome: nome,
                descricao: descricao,
                capacidade: capacidade,
                imagem: imagem,
                quantidade: quantidade * 1,
                valor: valor * quantidade,
                link: match.params.id,
                usuario: usuarioEmail,
            }).then(() => {
                alert('Pedido adicionado ao carrinho com sucesso')
            }).catch(() => {
                alert('erro')
            });
        } else {
            alert('Quantidade inválida')
        }
    }

    return (
        <>
            <Header></Header>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-6 grid-product">

                        <img className="resize-product" src={urlImagem} alt="Imagem do produto"></img>

                    </div>

                    <div className="col-lg-6 product-text">
                        <div>
                            <div className="text-center prod-title" ><strong>{nome}</strong></div>
                            <div className="text-center prod-desc">{descricao}</div>
                            <div className="prod-capacidade text-center">Capacidade:</div>
                            <div className="text-center"><strong className="prod-capacidade">{capacidade} </strong> </div>

                            <div className="prod-preço text-center" >R$ {valor}</div>
                            <div className="text-center">
                                <label className="mr-4 mt-2" >Quantidade</label>
                                <input onChange={(e) => setQuantidade(e.target.value)} size="4"></input>
                            </div>
                            <div className="text-center mb-4"><button onClick={adicionarCarrinho} type="button" className="btn btn-primary btn-lg mt-5 " >Adicionar ao carrinho</button></div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Produto;