import styles from './Navigation.module.css';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import LogRegButtons from './LogRegButtons';

function Navigation(props) {
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
        <Nav.Link href="/">
          <Button
            variant="primary"
            onClick={props.onLogOut}
            className={styles.button}
          >
            Log Out
          </Button>
        </Nav.Link>
      )}
    </Nav>
  );
}

export default Navigation;
