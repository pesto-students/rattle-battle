import express from 'express';
import userValidator from '../validators/userValidator';
import userFieldsErrors from '../middleware/userFieldsErrors';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});
router.post('/api/signup', userValidator(), userFieldsErrors, userController.createNewUser);
router.post('/api/login', userValidator({ usernameRequired: false }), userFieldsErrors, userController.loginUser);

export default router;
