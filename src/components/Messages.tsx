import * as React from 'react';
import { Message as MessageModel } from '../models';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';


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
        // Loop through all the messages in the state and create a Message List component
        return (
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <List id='messageList' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {this.props.messages.map(message => (
                        <ListItem key={message.message + Math.floor((Math.random() * 10000) + 1)} alignItems="flex-start">
                            {/* <Divider variant="inset" component="li" /> */}
                            <ListItemAvatar>
                                <Avatar alt={message.name} sx={{ bgcolor: blue[100] }} src="/static/images/avatar/1.jpg" />
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