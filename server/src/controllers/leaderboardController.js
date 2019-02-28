import Leaderboard from '../database/models/leaderboard';

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
  const topFive = await Leaderboard.find().sort('-score').limit(5);

  res.json(topFive);
};

export default {
  addScore,
  getTopLeaders,
};
