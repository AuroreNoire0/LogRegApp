import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from './constants/userConstants';
import Footer from './components/Footer';
import Home from './components/views/Home';
import Navigation from './components/Navigation';
import LogModal from './modals/LogModal';
import RegModal from './modals/RegModal';
import AdminView from './components/views/AdminView';
import store from './store';

const App = () => {
  const [logModalOpened, setLogModalOpened] = useState(false);
  const [regModalOpened, setRegModalOpened] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openLogModal = () => {
    navigate('/');
    setLogModalOpened(true);
    setRegModalOpened(false);
    setError(null);
  };

  const openRegModal = () => {
    navigate('/');
    setRegModalOpened(true);
    setLogModalOpened(false);
  };

  const closeLogModal = () => {
    setLogModalOpened(false);
  };

  const closeRegModal = () => {
    setRegModalOpened(false);
  };

  const lastLoginUpd = async () => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = store.getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/users/lastlogin/${userInfo._id}`,
        config
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const setUserLoggedHandler = async (email, password) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      if (data.status === 'Blocked') {
        throw new Error("User blocked. You can't log in.");
      }

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserLogged(true);
      setLogModalOpened(false);
      navigate('/admin');
      lastLoginUpd();
      setError(null);
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  const logOutHandler = () => {
    dispatch({ type: USER_LOGOUT });
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
          errorMessage={error ? error : null}
        ></LogModal>
      )}
      {regModalOpened && !logModalOpened && (
        <RegModal onCloseRegModal={closeRegModal} />
      )}

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          path="/admin"
          element={<AdminView onLogout={logOutHandler} />}
        ></Route>
      </Routes>

      <Footer></Footer>
    </React.Fragment>
  );
};

export default App;
