import Form from 'react-bootstrap/Form';
import styles from './AdminPanel.module.css';

const NewUserRow = props => {
  const formStyles = `${styles.checkbox} checkbox`;
  const ariaLabel = `user_${props.newUser.id}`;
  return (
    <tr>
      <td>
        <Form.Check
          className={formStyles}
          type="checkbox"
          aria-label={ariaLabel}
          onChange={props.onChangeCheckbox}
        />
      </td>
      <td>{props.newUser.id}</td>
      <td>{props.newUser.name}</td>
      <td>{props.newUser.email}</td>
      <td>02.06.22</td>
      <td>01.06.22</td>
      <td>{props.newUser.status}</td>
    </tr>
  );
};

export default NewUserRow;
