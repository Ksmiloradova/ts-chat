import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { Message as MessageModel } from '../models';
import { ChatState } from '../state';
import { Action } from '../actions';
import { Messages } from './Messages';
import { ChatInput } from './ChatInput';
import Grid from '@mui/material/Grid';

const mapStateToProps = (state: ChatState, ownProps: OwnProps): ConnectedState => ({
    messages: state.messages
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Action>): ConnectedDispatch => ({});

interface OwnProps {
    socket: WebSocket,
    username: string
}

interface ConnectedState {
    messages: MessageModel[]
}

interface ConnectedDispatch {
}

interface OwnState {
}

export class ChatAppComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    sendHandler = (message: string) => {
        const messageObject: MessageModel = {
            name: this.props.username,
            message: message
        }
        this.props.socket.send(JSON.stringify(messageObject));
    }

    render() {
        return (
            <>
                <Grid container justifyContent="center">
                    <Messages username={this.props.username} messages={this.props.messages} />
                </Grid>
                <Grid container justifyContent="center">
                    <ChatInput onSend={this.sendHandler} />
                </Grid>
            </>
        );
    }
}

export const ChatApp: any = connect(mapStateToProps, mapDispatchToProps)(ChatAppComponent);