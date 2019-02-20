
import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});

export default router;
