import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import NewUserRow from './NewUserRow';
import styles from './AdminPanel.module.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  //   const [checkboxes, setCheckboxes] = useState(
  //     Array.from(document.querySelectorAll('input[aria-label^="user"]'))
  //   );
  const [checkboxes, setCheckboxes] = useState([]);
  const selectAll = useRef(null);

  useEffect(() => {
    setCheckboxes(
      Array.from(document.querySelectorAll('input[aria-label^="user"]'))
    );
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/notes');
    setUsers(data);
  };

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectAllChangeHandler = () => {
    // const checkboxes = Array.from(
    //   document.querySelectorAll('input[aria-label^="user"]')
    // );
    if (selectAll.current.checked) {
      checkboxes.forEach(cb => (cb.checked = true));
    } else if (!selectAll.current.checked) {
      checkboxes.forEach(cb => (cb.checked = false));
    }
  };

  const changeSelectAll = event => {
    // const checkboxes = Array.from(
    //   document.querySelectorAll('input[aria-label^="user"]')
    // );
    const checkboxesChecked = checkboxes.filter(cb => cb.checked);
    if (checkboxes.length === checkboxesChecked.length) {
      selectAll.current.checked = true;
    } else if (!event.target.checked && selectAll.current.checked) {
      selectAll.current.checked = false;
    }
  };
  console.log(users.length);

  const btnsStyles = `${styles.actionButtons}`;
  return (
    <Container className="my-5">
      <div className={styles.tableToolbar}>
        <div>
          <p>User management panel</p>
        </div>
        <div className={btnsStyles}>
          <Button variant="danger">Block</Button>{' '}
          <FontAwesomeIcon className={styles.iconLock} icon={faLockOpen} />
          <FontAwesomeIcon className={styles.iconDelete} icon={faTrashCan} />
        </div>
      </div>
      <div>
        <Table bordered hover className="x">
          <thead>
            <tr>
              <th>
                <Form.Check
                  className={styles.checkbox}
                  type="checkbox"
                  aria-label="sellectAll"
                  ref={selectAll}
                  onChange={selectAllChangeHandler}
                />
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last login</th>
              <th>Registration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <NewUserRow
                  onChangeCheckbox={changeSelectAll}
                  newUser={{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    status: user.category,
                  }}
                  key={user._id}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminPanel;
