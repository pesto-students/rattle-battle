import io from 'socket.io-client';
import * as environment from '../config/environment';

const socket = io(environment.apiUrl).connect();
export default socket;
