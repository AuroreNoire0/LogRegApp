import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styles from './LogRegButtons.module.css';

const UserLoggedButtons = props => {
  return (
    <div className="d-flex col-6 col-sm-6 col-lg-3">
      <Nav.Item className="px-1 col-6 col-sm-7 col-lg-6">
        <Button
          variant="success"
          className={styles.button}
          onClick={props.onShowAdmPanel}
        >
          Admin Panel
        </Button>
      </Nav.Item>
      <Nav.Item className="px-1 col-6 col-sm-7 col-lg-6">
        <Button
          variant="primary"
          onClick={props.onLogOut}
          className={styles.button}
        >
          Log Out
        </Button>
      </Nav.Item>
    </div>
  );
};

export default UserLoggedButtons;
