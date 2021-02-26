import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const user = useSelector((state) => state.user);
  const { isLoggedIn, loading } = user;

  const classes = useStyles();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function onClickLogin(e) {
    e.preventDefault();
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  if (isLoggedIn) {
    history.push('/home');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
          {loading && <div>loading...</div>}
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClickLogin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export { LoginPage };
