import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, compose, Reducer } from 'redux';
import { Provider } from 'react-redux';
import { Action, addMessageAction } from './actions';
import { addMessage } from './actions/addMessage';
import { addUser } from './actions/addUser';
import { App } from './App';
import { UserMessage } from './models';
import { ChatState } from './state';
import reportWebVitals from "./reportWebVitals";

const socket: WebSocket = new WebSocket("ws://localhost:3000");

// For every reducer in our list, send the given action
function combineReducers(...reducers: Reducer<ChatState>[]) {
  return (state: ChatState, action: Action) => {
    return reducers.reduce((previous: ChatState, next: Reducer<ChatState>) => next(previous, action), state);
  }
}

let store = createStore(combineReducers(addMessage, addUser), undefined, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

// Listen for messages from the server
socket.onmessage = (message: MessageEvent) => {
  // Whenever the server broadcasts a message, add it to our message list
  store.dispatch(addMessageAction(new UserMessage(message.data)));
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>
);

reportWebVitals();