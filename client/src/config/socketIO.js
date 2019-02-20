import io from 'socket.io-client';
import * as environment from './environment';

const socket = io(environment.apiUrl);

export default socket;
