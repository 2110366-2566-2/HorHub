import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:3001';

export const socket = io(URL);

