// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { App } from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose, Reducer } from 'redux';
import { Provider } from 'react-redux';
import { Action, addMessageAction } from './actions';
import { addMessage } from './reducers/addMessage';
import { addUser } from './reducers/addUser';
import { App } from './App';

import { UserMessage } from './models';
import { ChatState } from './state';

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

// Render the app
ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById("app")
);