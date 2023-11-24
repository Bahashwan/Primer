const express = require('express');
const Main = require('../../Components/Main');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).renderComponent(Main, { title: 'Main' });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
