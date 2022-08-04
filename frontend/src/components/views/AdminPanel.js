import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import NewUserRow from './NewUserRow';
import styles from './AdminPanel.module.css';
import Button from 'react-bootstrap/Button';
import Spinner from '../Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import store from '../../store';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../../constants/userConstants';
import ErrorMessage from '../ErrorMessage';

const AdminPanel = props => {
  const [users, setUsers] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const selectAll = useRef(null);

  useEffect(() => {
    setCheckboxes(
      Array.from(document.querySelectorAll('input[aria-label^="user"]'))
    );
  }, [users]);

  useEffect(() => {
    setError(null);
    fetchUsers();
    setIsChanged(false);
  }, [isChanged]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const {
        userLogin: { userInfo },
      } = store.getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/users', config);

      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Only logged in users can see this page. Please log in.'
      );
      setIsLoading(false);
    }
  };

  const selectAllChangeHandler = () => {
    if (selectAll.current.checked) {
      checkboxes.map(cb => (cb.checked = true));
      setCheckedId(checkboxes.map(cb => cb.id));
    } else if (!selectAll.current.checked) {
      checkboxes.map(cb => (cb.checked = false));
      setCheckedId([]);
    }
  };

  const changeSelectAll = event => {
    const checkboxesChecked = checkboxes.filter(cb => cb.checked);
    if (checkboxes.length === checkboxesChecked.length) {
      selectAll.current.checked = true;
    } else if (!event.target.checked && selectAll.current.checked) {
      selectAll.current.checked = false;
    }
    setCheckedId(checkboxesChecked.map(cb => cb.id));
  };

  const deleteUserHandler = async () => {
    checkedId.map(async id => {
      try {
        dispatch({ type: USER_DELETE_REQUEST });

        const {
          userLogin: { userInfo },
        } = store.getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS, payload: data });

        localStorage.removeItem('userInfo');
        if (userInfo._id === id) {
          setTimeout(() => {
            dispatch({ type: USER_LOGOUT });
            props.onLogout();
          }, 2000);
        }
      } catch (error) {
        setIsLoading(true);
        dispatch({
          type: USER_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });

        setIsLoading(false);
      }
      setIsChanged(true);
    });
  };

  const blockUserHandler = async () => {
    checkedId.map(async id => {
      try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const {
          userLogin: { userInfo },
        } = store.getState();

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(`/api/users/${id}`, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        if (userInfo._id === id) {
          setTimeout(() => {
            dispatch({ type: USER_LOGOUT });
            props.onLogout();
          }, 2000);
        }
      } catch (error) {
        setIsLoading(true);
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        setIsLoading(false);
      }
      setIsChanged(true);
    });
  };

  const unblockUserHandler = async () => {
    checkedId.map(async id => {
      try {
        dispatch({ type: USER_UPDATE_REQUEST });

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.post(`/api/users/unblock/${id}`, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        setIsLoading(true);
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
        setIsLoading(false);
      }
      setIsChanged(true);
    });
  };

  const btnsStyles = `${styles.actionButtons}`;
  return (
    <div>
      {isLoading && <Spinner />}
      {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : ''}
      {!isLoading && !error && (
        <Container className={styles.container}>
          <div className={styles.tableToolbar}>
            <div>
              <p>Admin panel</p>
            </div>
            <div className={btnsStyles}>
              <Button variant="danger" onClick={blockUserHandler}>
                Block
              </Button>{' '}
              <FontAwesomeIcon
                onClick={unblockUserHandler.bind('unblock')}
                className={styles.iconLock}
                icon={faLockOpen}
              />
              <FontAwesomeIcon
                onClick={deleteUserHandler}
                className={styles.iconDelete}
                icon={faTrashCan}
              />
            </div>
          </div>

          <Table bordered hover responsive>
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
                      status: user.status,
                      createdAt: user.createdAt,
                      lastLogin: user.lastLogin,
                    }}
                    key={user._id}
                  />
                );
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default AdminPanel;
