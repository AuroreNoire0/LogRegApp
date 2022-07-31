import styles from './Navigation.module.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LogRegButtons from './LogRegButtons';
import { useNavigate } from 'react-router-dom';

function Navigation(props) {
  let navigate = useNavigate();
  const navStyle = `${styles.nav} d-flex justify-content-between`;

  return (
    <Nav variant="pills" className={navStyle}>
      <Nav.Item className={styles.logo}>Travel passionates</Nav.Item>
      {!props.userLogged ? (
        <LogRegButtons
          onShowLogModal={props.onShowLogModal}
          onShowRegModal={props.onShowRegModal}
        />
      ) : (
        <Button
          variant="primary"
          onClick={props.onLogOut}
          className={styles.button}
        >
          Log Out
        </Button>
      )}
    </Nav>
  );
}

export default Navigation;
