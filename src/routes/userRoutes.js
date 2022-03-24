const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => res.status(200).send('Tudo ok!'));

module.exports = router;