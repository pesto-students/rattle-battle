import { getAPI } from './fetch-api';
/* eslint-disable import/prefer-default-export */
export const getTopPlayers = getAPI('/api/leaderboard/top');
