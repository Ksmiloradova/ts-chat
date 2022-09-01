import { Action } from './index';
import { ChatState } from '../state';

const initialState: ChatState = {
    messages: [],
    users: []
};

export function addMessage(state: ChatState = initialState, action: Action): ChatState {
    if (action.type === 'ADD_MESSAGE') {
        return {
            messages: [...state.messages, action.message],
            users: state.users
        };
    }

    return state;
}