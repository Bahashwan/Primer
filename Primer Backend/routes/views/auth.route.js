const express = require('express');
const Rega = require('../../Components/Rega');


const router = express.Router();

router.get('/reg', async (req, res) => {
  try {
    res.status(200).renderComponent(Rega, { title: 'Rega' });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
