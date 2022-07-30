import { useState } from 'react';
import Navigation from './Navigation';
import Home from './views/Home';
import LogModal from '../modals/LogModal';
import RegModal from '../modals/RegModal';
import AdminPanel from './views/AdminPanel';
import styles from './Background.module.css';
import { withRouter } from 'react-router-dom';

const Background = () => {
  // const [logModalOpened, setLogModalOpened] = useState(false);
  // const [regModalOpened, setRegModalOpened] = useState(false);
  // const [userLogged, setUserLogged] = useState(false);

  // const openLogModal = () => {
  //   setLogModalOpened(true);
  //   setRegModalOpened(false);
  // };

  // const openRegModal = () => {
  //   setRegModalOpened(true);
  //   setLogModalOpened(false);
  // };

  // const closeLogModal = () => {
  //   setLogModalOpened(false);
  // };

  // const closeRegModal = () => {
  //   setRegModalOpened(false);
  // };

  // const setUserLoggedHandler = () => {
  //   setUserLogged(true);
  //   setLogModalOpened(false);
  // };

  // const logOutHandler = () => {
  //   setUserLogged(false);
  // };

  return (
    <section className={styles.background}>
      <p>hh</p>
      <AdminPanel></AdminPanel>
      <div className={styles.hero_shadow}></div>
    </section>
  );
};

export default Background;
