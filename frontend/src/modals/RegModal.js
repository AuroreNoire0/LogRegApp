import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './LogModal.module.css';
import useNewInput from '../hooks/use-new-input';
import { useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';

const RegModal = props => {
  const isNotEmpty = value => value.trim() !== '';
  const isEmail = value => value.includes('@');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    lastLogin: new Date(),
    registerDate: new Date(),
    status: '',
  });

  const regHandler = event => {
    event.preventDefault();
    setNewUser({
      name: { name },
      email: { email },
      password: { password },
      lastLogin: '',
      registerDate: new Date(),
      status: 'active',
    });

    axios
      .post('http://localhost:4000/app/signup', newUser)
      .then(response => console.log(response.data));

    console.log('bvhj');
  };

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useNewInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangedHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useNewInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useNewInput(isNotEmpty && isEmail);

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const logFormStyles = `${styles.logForm} regModal col-5`;

  const passwordStyles = passwordHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const emailStyles = emailHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  const nameStyles = nameHasError
    ? `${styles.invalid} ${styles.input}`
    : `${styles.input}`;

  return (
    <div className={logFormStyles}>
      <Form>
        <span className={styles.title}>Register</span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
            value={email}
            className={emailStyles}
          />
          {emailHasError && (
            <p className={styles.errorText}>Please enter a valid email.</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            className={nameStyles}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={name}
          />
          {nameHasError && (
            <p className={styles.errorText}>This field can't be empty.</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={passwordStyles}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            value={password}
          />
          {passwordHasError && (
            <p className={styles.errorText}>This field can't be empty.</p>
          )}
        </Form.Group>

        <div className={styles.btns}>
          <Nav.Link href="/reg">
            <Button
              variant="primary"
              onClick={regHandler}
              type="submit"
              className={styles.subBtn}
              disabled={!formIsValid}
            >
              Register
            </Button>
          </Nav.Link>
          <Button
            variant="secondary"
            type="button"
            onClick={props.onCloseRegModal}
            className={styles.subBtn}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegModal;
