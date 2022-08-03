import Form from 'react-bootstrap/Form';
import styles from './AdminPanel.module.css';

const NewUserRow = props => {
  const formStyles = `${styles.checkbox} checkbox`;
  const ariaLabel = `user_${props.newUser.id}`;
  const date = new Date(`${props.newUser.createdAt}`);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const regDate = `${day}/${month}/${year}`;

  return (
    <tr>
      <td>
        <Form.Check
          className={formStyles}
          type="checkbox"
          aria-label={ariaLabel}
          onChange={props.onChangeCheckbox}
          id={props.newUser.id}
        />
      </td>
      <td>{props.newUser.id}</td>
      <td>{props.newUser.name}</td>
      <td>{props.newUser.email}</td>
      <td>{regDate}</td>
      <td>{regDate}</td>
      <td>{props.newUser.status}</td>
    </tr>
  );
};

export default NewUserRow;
