import styles from './Navigation.module.css';
import Nav from 'react-bootstrap/Nav';
import LogRegButtons from './LogRegButtons';
import { useNavigate } from 'react-router-dom';
import UserLoggedButtons from './UserLoggedButtons';

function Navigation(props) {
  let navigate = useNavigate();
  const navStyle = `${styles.nav}`;
  const onShowAdmPanel = () => {
    navigate('/admin');
  };
  const stylesLogo = `${styles.logo} px-xl-5 col-3 col-sm-4`;

  return (
    <Nav variant="pills" className={navStyle}>
      <Nav.Item className={stylesLogo}>App</Nav.Item>
      {!props.userLogged ? (
        <LogRegButtons
          className="col"
          onShowLogModal={props.onShowLogModal}
          onShowRegModal={props.onShowRegModal}
        />
      ) : (
        <UserLoggedButtons
          onLogOut={props.onLogOut}
          onShowAdmPanel={onShowAdmPanel}
        />
      )}
    </Nav>
  );
}

export default Navigation;
