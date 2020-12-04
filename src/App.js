import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from '../src/store';
import Carrinho from './view/carrinho';
import Endereços from './view/endereços';
import Add from './view/endereços/add';
import Edit from './view/endereços/edit';
import Home from './view/home/home';
import Login from './view/login';
import LostPassword from './view/lostpassword';
import MinhaConta from './view/minhaConta';
import NewUser from './view/newUser';
import Produto from './view/produto';
import AddProduto from './view/produto/add';
import EditProduto from './view/produto/edit';
import Smartphones from './view/smartphones';

function App() {
  return (


    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/minhaconta' component={MinhaConta}></Route>
          <Route exact path='/minhaconta/endereços' component={Endereços}></Route>
          <Route exact path='/minhaconta/endereços/add' component={Add}></Route>
          <Route  path='/minhaconta/endereços/edit/:id' component={Edit}></Route>
          <Route  exact path='/smartphones' component={Smartphones}></Route>
          <Route  path='/smartphones/p/:id' component={Produto}></Route>
          <Route exact path='/minhaconta/produtos/add' component={AddProduto}></Route>
          <Route exact path='/carrinho' component={Carrinho}></Route>
          <Route  path='/smartphones/editar/:id' component={EditProduto}></Route>
          <Route exact path='/lostpassword' component={LostPassword}></Route>
          <Route exact path='/newUser' component={NewUser}></Route>


          
          
          
          
    

        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
