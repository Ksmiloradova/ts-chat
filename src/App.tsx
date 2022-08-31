import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Action, addUserAction } from './actions';
import { ChatState } from './state';
import { ChatApp } from './components/ChatApp';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({});

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({
  addUser: (username: string, socket: WebSocket) => {
    dispatch(addUserAction(username, socket));
  }
});

interface OwnProps {
  socket: WebSocket
}

interface ConnectedState {
}

interface ConnectedDispatch {
  addUser: (username: string, socket: WebSocket) => void
}

interface OwnState {
  username: string,
  submitted: boolean
}

export class AppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

  state = {
    username: '',
    submitted: false
  }

  usernameChangeHandler = (event: any) => {
    this.setState({ username: event.target.value });
  }

  usernameSubmitHandler = (event: any) => {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
    this.props.addUser(this.state.username, this.props.socket);
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now show the main App
      return (
        <ChatApp username={this.state.username} socket={this.props.socket} />
      );
    }
    return (
      <form onSubmit={this.usernameSubmitHandler} className="username-container">
        <Grid container justifyContent="center" marginTop='10%' marginBottom='20%'>
          <Typography variant="h2" gutterBottom>
            Добро пожаловать в чат!
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          <TextField type="text"
            id="standard"
            label="Введите имя..."
            onChange={this.usernameChangeHandler}
            variant="standard"
            sx={{ width: '50%', padding: '5px' }}
            required
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Ввести
          </Button>
        </Grid>
      </form>
    );
  }
}

export const App: any = connect(mapStateToProps, mapDispatchToProps)(AppComponent);