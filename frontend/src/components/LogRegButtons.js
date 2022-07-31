import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styles from './LogRegButtons.module.css';

const LogRegButtons = props => {
  return (
    <div className="d-flex">
      <Nav.Item className="px-5">
        <Button
          variant="primary"
          className={styles.button}
          onClick={props.onShowLogModal}
        >
          Log in
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Button
          variant="primary"
          onClick={props.onShowRegModal}
          className={styles.button}
        >
          Register
        </Button>
      </Nav.Item>
    </div>
  );
};

export default LogRegButtons;
