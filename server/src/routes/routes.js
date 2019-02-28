import express from 'express';
import signupValidator from '../validators/signupValidator';
import loginValidator from '../validators/loginValidator';
import userFieldsErrors from '../middleware/userFieldsErrors';
import userController from '../controllers/userController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});
router.post('/api/signup', signupValidator, userFieldsErrors, userController.createNewUser);
router.post('/api/login', loginValidator, userFieldsErrors, userController.loginUser);
router.get('/api/validate', auth, (req, res) => res.send(req.user));

export default router;
