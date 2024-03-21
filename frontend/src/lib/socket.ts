import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export const socket = io(URL, { path: process.env.REACT_APP_CLIENT_PATH });