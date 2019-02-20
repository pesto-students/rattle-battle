
const express = require('express');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ status: 'working' });
});

module.exports = router;
