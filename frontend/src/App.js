import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Background from './components/Background';
import Footer from './components/Footer';
import Home from './components/views/Home';
import AdminPanel from './components/views/AdminPanel';
import Navigation from './components/Navigation';
import LogModal from './modals/LogModal';
import RegModal from './modals/RegModal';
import Test from './Test';

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
      {/* {!logModalOpened && !regModalOpened && !userLogged && <Home />}
        {!logModalOpened && !regModalOpened && userLogged && <Background />} */}
      {logModalOpened && !regModalOpened && (
        <LogModal
          onCloseLogModal={closeLogModal}
          onClickLogBtn={setUserLoggedHandler}
        />
      )}
      {regModalOpened && !logModalOpened && (
        <RegModal onCloseRegModal={closeRegModal} />
      )}

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/log">
          <Background />
        </Route>
      </Switch>

      <Footer></Footer>
    </Router>
  );
};

export default App;
