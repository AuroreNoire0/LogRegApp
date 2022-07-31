import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import Background from './components/Background';
import Footer from './components/Footer';
import Home from './components/views/Home';
import Navigation from './components/Navigation';
import LogModal from './modals/LogModal';
import RegModal from './modals/RegModal';

const App = () => {
  const [logModalOpened, setLogModalOpened] = useState(false);
  const [regModalOpened, setRegModalOpened] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

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
  };

  return (
    <Router>
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
        <Route path="/logged" element={<Background />}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
};

export default App;
