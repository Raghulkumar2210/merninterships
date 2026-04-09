const express = require('express');
const { getIncomes, createIncome, updateIncome, deleteIncome } = require('../controllers/incomeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getIncomes);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;