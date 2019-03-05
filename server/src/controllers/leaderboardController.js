import Leaderboard from '../database/models/leaderboard';
import { LEADERBOARD_LIMIT } from '../app/appConstants';

const addScore = async (req, res) => {
  const {
    user: { username },
    body: { score },
  } = req;
  let userOnLeaderboard = await Leaderboard.findOne({ username });
  if (userOnLeaderboard) {
    if (userOnLeaderboard.score < score) {
      userOnLeaderboard.score = score;
    }
  } else {
    userOnLeaderboard = await Leaderboard.create({ username, score });
  }
  await userOnLeaderboard.save();
  return res
    .status(201)
    .send(userOnLeaderboard);
};

const getTopLeaders = async (req, res) => {
  const { limit = LEADERBOARD_LIMIT } = req.query;
  const topLeaders = await Leaderboard.find().sort('-score').limit(limit);

  res.json(topLeaders);
};

export default {
  addScore,
  getTopLeaders,
};
