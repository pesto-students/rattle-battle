import express from 'express';
import signupValidator from '../validators/signupValidator';
import loginValidator from '../validators/loginValidator';
import fieldsErrors from '../middleware/fieldsErrors';
import userController from '../controllers/userController';
import requireAuth from '../middleware/requireAuth';
import leaderboardController from '../controllers/leaderboardController';
import leaderboardValidator from '../validators/leaderboardValidator';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});
router.post('/api/signup', signupValidator, fieldsErrors, userController.createNewUser);
router.post('/api/login', loginValidator, fieldsErrors, userController.loginUser);
router.get('/api/validate', requireAuth, (req, res) => res.send(req.user));
router.post('/api/leaderboard', requireAuth, leaderboardValidator, fieldsErrors, leaderboardController.addScore);
router.get('/api/leaderboard/top', leaderboardController.getTopLeaders);

export default router;
