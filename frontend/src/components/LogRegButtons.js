import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styles from './LogRegButtons.module.css';

const LogRegButtons = props => {
  return (
    <div className="d-flex col-6 col-sm-6 col-lg-3">
      <Nav.Item className="px-lg-5 col-6 col-sm-7 col-lg-6">
        <Button
          variant="warning"
          className={styles.button}
          onClick={props.onShowLogModal}
        >
          LogIn
        </Button>
      </Nav.Item>
      <Nav.Item className="px-lg-5 col-6 col-sm-6 col-lg-6">
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
