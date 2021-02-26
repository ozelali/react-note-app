import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { noteActions } from '../../_actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ButtonGroup } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: theme.spacing(5),
  },
  divider: {
    height: 28,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  mainGrid: {
    marginTop: theme.spacing(5),
  },
}));

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.note);
  const { notes, loading } = noteList;

  const [isEditing, setEditStatus] = useState(false);

  const [inputs, setInputs] = useState({
    note: '',
    id: '',
  });
  const { note } = inputs;

  useEffect(() => {
    dispatch(noteActions.getNotes(localStorage.getItem('user')));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function onClickAddNote(e) {
    e.preventDefault();
    dispatch(noteActions.addNote(localStorage.getItem('user'), note));
    setInputs({
      note: '',
      id: '',
    });
  }

  function onClickDeleteNote(itemid) {
    dispatch(noteActions.deleteNote(localStorage.getItem('user'), itemid));
  }

  function selectNote4Edit(note: any) {
    setInputs({
      note: note.note,
      id: note.id,
    });
    setEditStatus(true);
  }

  function onClickSave() {
    dispatch(
      noteActions.editNote(localStorage.getItem('user'), inputs.id, inputs.note)
    );
    setEditStatus(false);
    setInputs({
      note: '',
      id: '',
    });
  }

  const saveAndCancelBtn = () => [
    <IconButton color="primary" aria-label="directions" onClick={onClickSave}>
      <DoneIcon />
    </IconButton>,
    <IconButton
      color="primary"
      aria-label="directions"
      onClick={() => {
        setEditStatus(false);
        setInputs({
          note: '',
          id: '',
        });
      }}
    >
      <ClearIcon />
    </IconButton>,
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={5}>
        <Grid className="header" container justify="center">
          <Typography variant="h5">Notes</Typography>
        </Grid>
      </Box>
      <div className={classes.paper}>
        <Grid className="mainGrid" container spacing={3}>
          <Paper component="form" className={classes.root}>
            <InputBase
              name="note"
              className={classes.input}
              placeholder="Enter Note"
              value={note}
              onChange={handleChange}
            />
            <Divider className={classes.divider} orientation="vertical" />
            {!isEditing ? (
              <IconButton
                color="primary"
                aria-label="directions"
                onClick={onClickAddNote}
              >
                <AddIcon />
              </IconButton>
            ) : (
              saveAndCancelBtn()
            )}
          </Paper>
        </Grid>

        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Notes</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? 'Loading...'
                : notes?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row?.note}
                      </TableCell>
                      <TableCell align="right">
                        <ButtonGroup
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <IconButton
                            aria-label="edit"
                            onClick={() => selectNote4Edit(row)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => onClickDeleteNote(row?.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export { HomePage };
