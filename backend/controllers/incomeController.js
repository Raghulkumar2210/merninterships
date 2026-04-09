const Income = require('../models/Income');

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createIncome = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const income = new Income({
      amount,
      category,
      description,
      date,
      userId: req.user._id
    });
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getIncomes, createIncome, updateIncome, deleteIncome };