import * as React from 'react';
import { Message as MessageModel } from '../models';
import { Message } from './Message';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface OwnProps {
    username: string,
    messages: MessageModel[]
}

interface OwnState {
}

export class Messages extends React.Component<OwnProps, OwnState> {

    componentDidUpdate() {
        // get the message list container and set the scrollTop to the height of the container
        const objDiv = document.getElementById('messageList');
        objDiv!.scrollTop = objDiv!.scrollHeight;
    }

    render() {
        // Loop through all the messages in the state and create a Message component
        const messages = this.props.messages.map((message: MessageModel, i) => {
            return (
                <Message
                    key={i}
                    username={message.name}
                    message={message.message}
                    fromMe={message.name === this.props.username} />
            );
        });

        return (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <List id='messageList' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {this.props.messages.map(message => (
                        <ListItem key={message.message + Math.floor((Math.random() * 10000) + 1)} alignItems="flex-start">
                            {/* <Divider variant="inset" component="li" /> */}
                            <ListItemAvatar>
                                <Avatar alt={message.name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={message.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {message.message}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))
                    }
                </List >
            </Box>
        );
    }
}