import express from 'express';
import signupValidator from '../validators/signupValidator';
import loginValidator from '../validators/loginValidator';
import userFieldsErrors from '../middleware/userFieldsErrors';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});
router.post('/api/signup', signupValidator, userFieldsErrors, userController.createNewUser);
router.post('/api/login', loginValidator, userFieldsErrors, userController.loginUser);

export default router;
