import { Schema, model } from 'mongoose';
import { modelToJSON } from '../../utils/databaseUtils';

const leaderboardSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

/**
 * Overides the model's default JSON stringify method
 * @returns Object with username and score
 */
leaderboardSchema.methods.toJSON = function toJSON() {
  return modelToJSON(this, ['username', 'score']);
};

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
