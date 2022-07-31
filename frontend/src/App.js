import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/views/Home';
import Navigation from './components/Navigation';
import LogModal from './modals/LogModal';
import RegModal from './modals/RegModal';
import AdminView from './components/AdminView';

const App = () => {
  const [logModalOpened, setLogModalOpened] = useState(false);
  const [regModalOpened, setRegModalOpened] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const navigate = useNavigate();

  const openLogModal = () => {
    setLogModalOpened(true);
    setRegModalOpened(false);
  };

  const openRegModal = () => {
    setRegModalOpened(true);
    setLogModalOpened(false);
  };

  const closeLogModal = () => {
    setLogModalOpened(false);
  };

  const closeRegModal = () => {
    setRegModalOpened(false);
  };

  const setUserLoggedHandler = () => {
    setUserLogged(true);
    setLogModalOpened(false);
  };

  const logOutHandler = () => {
    setUserLogged(false);
    navigate('/');
  };

  return (
    <React.Fragment>
      <Navigation
        onShowLogModal={openLogModal}
        onShowRegModal={openRegModal}
        onLogOut={logOutHandler}
        userLogged={userLogged}
      ></Navigation>

      {logModalOpened && !regModalOpened && (
        <LogModal
          onCloseLogModal={closeLogModal}
          onClickLogBtn={setUserLoggedHandler}
        />
      )}
      {regModalOpened && !logModalOpened && (
        <RegModal onCloseRegModal={closeRegModal} />
      )}

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/admin" element={<AdminView />}></Route>
      </Routes>

      <Footer></Footer>
    </React.Fragment>
  );
};

export default App;
