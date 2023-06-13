import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from "./store/session"
import { ModalProvider, Modal } from './context/Modal';
import SpotList from './components/Spots';
import { Header } from './components/Header';
import SpotDetails from './components/SpotDetails';
import CreateSpotForm from './components/CreateSpotForm';
import EditSpotForm from './components/EditSpotForm';
import UserSpotList from './components/UserSpotList';
import { Footer } from './components/Footer';




const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions
}

function Root() {
  return (
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Header>
            <App />
            <Modal />
          </Header>
          <Switch>
            <Route exact path="/" component={SpotList}/>
            <Route path='/spots/new' component={CreateSpotForm}></Route>
            <Route exact path='/spots/current' component={UserSpotList}></Route>
            <Route exact path='/spots/:spotId' component={SpotDetails} ></Route>
            <Route exact path='/spots/:spotId/edit' component={EditSpotForm} ></Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
